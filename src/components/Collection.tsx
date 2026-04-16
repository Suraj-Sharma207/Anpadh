import { useState } from 'react';
import type { Book } from '../types';

interface CollectionProps {
  books: Book[];
  addToCart: (book: Book) => void;
}

export default function Collection({ books, addToCart }: CollectionProps) {
  const [showAll, setShowAll] = useState(false);
  
  const displayedBooks = showAll ? books : books.slice(0, 3);

  return (
    <section id="collection" className="py-24 px-6 max-w-7xl mx-auto w-full relative">
      <h2 className="text-5xl text-center mb-16" style={{ fontFamily: 'var(--font-display)' }}>
        Curated Selections
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {displayedBooks.map((book) => (
          <div
            key={book.id}
            className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 flex flex-col"
          >
            <div className="aspect-[2/3] w-full mb-6 overflow-hidden rounded-xl bg-white/5 relative">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 mix-blend-luminosity hover:mix-blend-normal"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <h3 className="text-2xl mt-auto" style={{ fontFamily: 'var(--font-display)' }}>
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
            <p className="text-lg mt-4 text-foreground/90">{book.price}</p>

            <button
              onClick={() => addToCart(book)}
              className="liquid-glass w-full mt-6 py-3 text-sm rounded-full text-foreground/90 hover:text-white cursor-pointer transition-transform duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <button 
          onClick={() => setShowAll(!showAll)}
          className="border border-white/20 rounded-full px-10 py-3 text-sm hover:bg-white/10 transition-colors duration-300 backdrop-blur-md cursor-pointer"
        >
          {showAll ? 'Show Less' : 'View Complete Collection'}
        </button>
      </div>
    </section>
  );
}
