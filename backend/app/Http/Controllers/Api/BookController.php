<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Book::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('book_name', 'ILIKE', "%{$request->search}%")
                    ->orWhere('description', 'ILIKE', "%{$request->search}%");
            });
        }

        $books = $query->paginate(4);

        return response()->json($books);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_name' => 'required|max:150',
            'author' => 'required|max:150',
            'description' => 'nullable',
            'published_date' => 'required|date',
        ]);

        $exists = Book::where('book_name', $request->book_name)
            ->where('author', $request->author)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Book with same name and author already exists'
            ], 422);
        }

        $book = Book::create($validated);

        return response()->json([
            'message' => 'Book created successfully',
            'data' => $book
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'message' => 'Book not found'
            ], 404);
        }

        $validated = $request->validate([
            'description' => 'nullable'
        ]);

        $book->update([
            'description' => $validated['description']
        ]);

        return response()->json([
            'message' => 'Description updated',
            'data' => $book
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                'message' => 'Book not found'
            ], 404);
        }

        $book->delete();

        return response()->json([
            'message' => 'Book deleted successfully'
        ]);
    }
}
