import { ArrowRight } from 'lucide-react';

export default function Journal() {
  const entries = [
    {
      id: 1,
      title: 'Reading as a Rebellion',
      date: 'April 15, 2026',
      category: 'Essays',
      image: 'https://images.unsplash.com/photo-1588638873871-636d9d4aa27b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      excerpt: 'In a world that demands constant attention and rapid consumption, dedicating time to a single narrative is an act of quiet defiance...'
    },
    {
      id: 2,
      title: 'The Spaces Between Words',
      date: 'April 02, 2026',
      category: 'Discourse',
      image: 'https://plus.unsplash.com/premium_photo-1666298864988-c5d7dbaeedfe?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      excerpt: 'True comprehension does not occur while reading the text, but in the silence immediately afterward, as the architecture of the mind adjusts...'
    }
  ];

  return (
    <section id="journal" className="py-24 px-6 max-w-7xl mx-auto w-full relative border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
            The Journal
          </h2>
          <p className="text-muted-foreground mt-4 max-w-md">
            Reflections, essays, and discourse on literature and the architecture of deep thought.
          </p>
        </div>
        <button className="border border-white/20 rounded-full px-8 py-2.5 text-sm hover:bg-white/10 transition-colors duration-300 backdrop-blur-md cursor-pointer flex items-center gap-2">
          Read All Entries <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {entries.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="aspect-video w-full mb-6 overflow-hidden rounded-2xl bg-white/5 relative">
              <img
                src={item.image}
                alt="Journal Entry"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity hover:mix-blend-normal"
                loading="lazy"
              />
            </div>
            <div className="text-sm text-muted-foreground mb-3 flex items-center gap-4">
              <span>{item.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span>{item.category}</span>
            </div>
            <h3 className="text-3xl mb-3 group-hover:text-white/80 transition-colors duration-300" style={{ fontFamily: 'var(--font-display)' }}>
              {item.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2">
              {item.excerpt}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
