export function NoteCard({ note, onDelete }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginTop: "15px",
      }}
    >
      <h3>{note.title}</h3>

      <p>{note.content}</p>

      <button onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default NoteCard;