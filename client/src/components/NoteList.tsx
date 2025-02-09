import { useEffect, useState } from "react";

interface Note {
  _id: string;
  title: string;
}
function App() {
  const [notes, setNotes] = useState<Note[]>([]); //empty array

  async function handleDelete(id: string) {
    await fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
    });
    setNotes(notes.filter((note) => note._id !== id));
  }

  useEffect(() => {
    console.log("Note list mounted");
    async function fetchNote() {
      const response = await fetch("http://localhost:3000/notes");
      const noteList = await response.json();
      setNotes(noteList);
    }
    fetchNote();

    return () => {
      //run after component is unmounted
      console.log("cleanup");
    };
  }, []); // Add an empty dependency array to prevent infinite re-renders

  return (
    <div>
      <ul className="note-list">
        {notes.map((note) => {
          return (
            <li key={note._id}>
              <button onClick={() => handleDelete(note._id)}>
                <i className="fa-solid fa-trash-can text-red-500"></i>
              </button>
              {note.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
