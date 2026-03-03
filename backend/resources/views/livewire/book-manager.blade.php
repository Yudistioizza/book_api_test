<div class="space-y-6">

    {{-- Search + Add Book --}}
    <div class="flex items-center justify-between gap-4">
        <flux:input 
            placeholder="Search by title or description..."
            wire:model.live="search"
            class="flex-1"
        />

        {{-- Tombol trigger modal --}}
        <flux:modal.trigger name="add-book">
            <flux:button variant="primary">
                Add Book
            </flux:button>
        </flux:modal.trigger>
    </div>

    {{-- Modal Add Book --}}
    <flux:modal name="add-book" class="md:w-96">
        <div class="space-y-6">
            <div>
                <flux:heading size="lg">Add New Book</flux:heading>
                <flux:text class="mt-2">Fill in the details below to add a new book.</flux:text>
            </div>

            <form wire:submit.prevent="save" class="space-y-4">
                <flux:input label="Book Name" wire:model="book_name" />
                <flux:input label="Author" wire:model="author" />
                <flux:textarea label="Description" wire:model="description" />
                <flux:input type="date" label="Published Date" wire:model="published_date" />

                <div class="flex justify-end">
                    <flux:button type="submit" variant="primary">Save Book</flux:button>
                </div>
            </form>
        </div>
    </flux:modal>

    {{-- Tabel Buku --}}
    <flux:card>
        {{-- Success Message --}}
        @if (session()->has('success'))
            <a href="#" aria-label="Success Message">
                <flux:card size="sm" class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800">
                    <flux:heading class="flex items-center gap-2 text-green-800 dark:text-green-200">
                        Success
                        <flux:icon name="check" class="ml-auto text-green-600 dark:text-green-300" variant="micro" />
                    </flux:heading>
                    <flux:text class="mt-1 text-green-700 dark:text-green-300">
                        {{ session('success') }}
                    </flux:text>
                </flux:card>
            </a>
        @endif

        {{-- Flux Table dengan pagination --}}
        <flux:table :paginate="$books" container:class="max-h-96 overflow-y-auto">
            <flux:table.columns sticky class="bg-white dark:bg-zinc-900">
                <flux:table.column>Title</flux:table.column>
                <flux:table.column>Author</flux:table.column>
                <flux:table.column>Published Date</flux:table.column>
                <flux:table.column>Action</flux:table.column>
            </flux:table.columns>

            <flux:table.rows>
                @forelse ($books as $book)
                    <flux:table.row>
                        <flux:table.cell>{{ $book->book_name }}</flux:table.cell>
                        <flux:table.cell>{{ $book->author }}</flux:table.cell>
                        <flux:table.cell>{{ $book->published_date }}</flux:table.cell>
                        <flux:table.cell class="space-x-2">
                            {{-- Tombol Delete sebagai modal trigger --}}
                            <flux:modal.trigger :name="'delete-book-'.$book->id">
                                <flux:button size="sm" variant="danger">
                                    Delete
                                </flux:button>
                            </flux:modal.trigger>

                            {{-- Modal konfirmasi Delete --}}
                            <flux:modal :name="'delete-book-'.$book->id" class="md:w-96 space-y-4 p-4">
                                    {{-- Heading & Pesan --}}
                                    <flux:heading size="md">Confirm Delete</flux:heading>
                                    <flux:text>
                                        Are you sure you want to delete <strong>{{ $book->book_name }}</strong>?
                                    </flux:text>

                                    {{-- Tombol aksi --}}
                                    <div class="flex justify-end gap-2">
                                        <flux:button 
                                            type="button" 
                                            onclick="FluxUI.closeModal('delete-book-{{ $book->id }}')"
                                        >
                                            Cancel
                                        </flux:button>

                                        <flux:button 
                                            type="button" 
                                            variant="danger" 
                                            wire:click="delete({{ $book->id }})" 
                                            onclick="FluxUI.closeModal('delete-book-{{ $book->id }}')"
                                        >
                                            Confirm Delete
                                        </flux:button>
                                    </div>
                            </flux:modal>

                        </flux:table.cell>
                    </flux:table.row>
                @empty
                    <flux:table.row>
                        <flux:table.cell colspan="4" class="text-center text-gray-500">
                            No books found
                        </flux:table.cell>
                    </flux:table.row>
                @endforelse
            </flux:table.rows>
        </flux:table>
    </flux:card>

</div>
