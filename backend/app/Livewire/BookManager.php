<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\WithPagination;
use App\Models\Book;

class BookManager extends Component
{
    use WithPagination;

    protected $paginationTheme = 'tailwind';

    public $book_name;
    public $author;
    public $description;
    public $published_date;
    public $search = '';

    protected function rules()
    {
        return [
            'book_name' => 'required|string|max:150',
            'author' => 'required|string|max:150',
            'description' => 'nullable|string',
            'published_date' => 'required|date',
        ];
    }

    public function save()
    {
        $this->validate();

        Book::create([
            'book_name' => $this->book_name,
            'author' => $this->author,
            'description' => $this->description,
            'published_date' => $this->published_date,
        ]);

        $this->reset(['book_name', 'author', 'description', 'published_date']);

        session()->flash('success', 'Book added successfully!');
    }

    public function delete($id)
    {
        $book = Book::find($id);
        if ($book) {
            $book->delete();
        }
    }

    public function render()
    {
        $books = Book::query()
            ->where('book_name', 'ilike', "%{$this->search}%")
            ->orWhere('description', 'ilike', "%{$this->search}%")
            ->paginate(4);

        return view('livewire.book-manager', [
            'books' => $books
        ])->title('Book Management');
    }
}
