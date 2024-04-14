// AnnouncementsSection.tsx
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Button, Input, FormGroup } from 'reactstrap';

const AnnouncementsSection: React.FC = () => {
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const handleAddAnnouncement = () => {
    if (newAnnouncement.trim() !== '') {
      setAnnouncements([...announcements, newAnnouncement]);
      setNewAnnouncement('');
    }
  };

  const handleDeleteAnnouncement = (index: number) => {
    const updatedAnnouncements = [...announcements];
    updatedAnnouncements.splice(index, 1);
    setAnnouncements(updatedAnnouncements);
  };

  return (
    <Card className="my-3" style={{marginRight: "10px"}}>
      <CardBody>
        <CardTitle tag="h5">Announcements</CardTitle>
        <FormGroup>
          <Input
            type="textarea"
            name="text"
            id="announcementInput"
            placeholder="Type your announcement here..."
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
          />
        </FormGroup>
        <Button color="warning" onClick={handleAddAnnouncement}>
          Add Announcement
        </Button>
        <div className="announcement-list mt-3">
          {announcements.map((announcement, index) => (
            <div key={index} className="announcement-item">
              <p>{announcement}</p>
              <Button close onClick={() => handleDeleteAnnouncement(index)} />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default AnnouncementsSection;
