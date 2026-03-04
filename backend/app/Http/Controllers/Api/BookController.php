<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Validation\Rule;


class BookController extends Controller
{
    // LIST + Pagination
    public function index()
    {
        $books = Book::paginate(4);
        return response()->json($books);
    }

    // CREATE
    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_name' => [
                'required',
                'string',
                'max:150',
                Rule::unique('books')
                    ->where(
                        fn($query) =>
                        $query->where('author', $request->author)
                    )
            ],
            'author' => [
                'required',
                'string',
                'max:150',
            ],
            'description' => [
                'nullable',
                'string',
            ],
            'published_date' => [
                'required',
                'date',
            ],
        ]);

        $book = Book::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Book created successfully',
            'data' => $book
        ], 201);
    }

    // UPDATE (only description)
    public function update(Request $request, $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $validated = $request->validate([
            'description' => 'required|string',
        ]);

        $book->update([
            'description' => $validated['description']
        ]);

        return response()->json($book);
    }

    // DELETE
    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json([
            'success' => true,
            'message' => 'Book deleted successfully'
        ], 200);
    }

    // SEARCH
    public function search(Request $request)
    {
        $search = $request->query('search');

        $query = Book::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('book_name', 'ilike', "%$search%")
                    ->orWhere('description', 'ilike', "%$search%");
            });
        }

        return response()->json($query->paginate(4));
    }
}
