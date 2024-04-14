// NotesSection.tsx
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button, Input, FormGroup } from 'reactstrap';

const NotesSection: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  const handleDeleteNote = (index: number) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };

  return (
    <Card className="my-3" style={{margin: "20px"}}>
      <CardBody>
        <CardTitle tag="h5">Notes</CardTitle>
        <FormGroup>
          <Input
            type="textarea"
            name="text"
            id="noteInput"
            placeholder="Type your note here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </FormGroup>
        <Button color="primary" onClick={handleAddNote}>
          Add Note
        </Button>
        <div className="notes-list mt-3">
          {notes.map((note, index) => (
            <div key={index} className="note-item">
              <p>{note}</p>
              <Button close onClick={() => handleDeleteNote(index)} />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default NotesSection;
