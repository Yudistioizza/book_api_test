<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;


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
            'book_name' => 'required|string|max:150',
            'author' => 'required|string|max:150',
            'description' => 'nullable|string',
            'published_date' => 'required|date',
        ]);

        // cek unique kombinasi
        $exists = Book::where('book_name', $validated['book_name'])
            ->where('author', $validated['author'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Book with same name and author already exists'
            ], 422);
        }

        $book = Book::create($validated);

        return response()->json($book, 201);
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
    public function destroy($id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $book->delete();

        return response()->json([
            'message' => 'Book deleted successfully'
        ]);
    }

    // SEARCH
    public function search(Request $request)
    {
        $query = Book::query();

        if ($request->book_name) {
            $query->where('book_name', 'ilike', '%' . $request->book_name . '%');
        }

        if ($request->description) {
            $query->where('description', 'ilike', '%' . $request->description . '%');
        }

        return response()->json($query->paginate(4));
    }
}
