import { useState, useEffect } from "react";
import axios from "axios";
import { RiSearchLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoPersonAddSharp } from "react-icons/io5";

import Card from "./companents/Card";
import Modal from "./companents/Modal";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  useEffect(() => {
    axios.get("/contact").then((res) => setContacts(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[1].value;
    const params = {
      q: text,
    };

    axios.get("/contact", { params }).then((res) => setContacts(res.data));
  };

  // Sil buttonunu aktif eden fonksiyon
  const handleDelete = (id) => {
    const res = confirm("Kişiyi silmek istediğinizden emin misiniz?");
    if (res) {
      axios
        .delete(`/contact/${id}`)
        .then(() => {
          const updated = contacts.filter((contact) => contact.id !== id);
          setContacts(updated);
        })
        .catch((err) => {
          alert("Silme işlemi sırasında bir hata oluştu !!");
          alert(err);
        });
    }
  };

  // Güncelleme yapacak fonksiyon
  const handleEdit = (contact) => {
    setIsModelOpen(true);

    setEditItem(contact);
  };
  return (
    <div className="app">
      {/* Header */}
      <header>
        <h1>Rehber</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <button>
              <RiSearchLine />
            </button>
            <input type="text" placeholder="Kişi aratınız ..." />
          </form>

          <button className="ns">
            <IoMenu />
          </button>
          <button className="ns">
            <HiMiniSquares2X2 />
          </button>

          <button onClick={() => setIsModelOpen(true)} className="add">
            <IoPersonAddSharp />
            <span>Yeni Kişi</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main>
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            contact={contact}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </main>
      {/* Modal */}

      <Modal
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        setContacts={setContacts}
        editItem={editItem}
        setEditItem={setEditItem}
      />
    </div>
  );
}

export default App;
