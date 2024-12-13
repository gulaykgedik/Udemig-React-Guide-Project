import axios from "axios";
import Field from "./Filed";
import { IoMdClose } from "react-icons/io";

const Modal = ({
  isModelOpen,
  setIsModelOpen,
  setContacts,
  editItem,
  setEditItem,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData.entries());

    try {
      if (!editItem) {
        const response = await axios.post("/contact", newContact);
        setContacts((contacts) => [...contacts, response.data]);
      } else {
        const response = await axios.put(`/contact/${editItem.id}`, newContact);
        setContacts((contacts) =>
          contacts.map((contact) =>
            contact.id === editItem.id ? response.data : contact
          )
        );
        setEditItem(null);
      }
      setIsModelOpen(() => false);
    } catch (err) {
      alert(`İşlem gerçekleşmedi`);
      console.log(err);
    }
  };

  return (
    isModelOpen && (
      <div className="modal">
        <div className="modal-inner">
          {/* Modal head */}
          <div className="modal-head">
            <h2>{editItem ? "Kişiyi Güncelle" : "Yeni Kişi Ekle"}</h2>
            <button onClick={() => setIsModelOpen(false)}>
              <IoMdClose />
            </button>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Field value={editItem?.name} label="İsim Soyisim" name="name" />
            <Field value={editItem?.positon} label="Pozisyon" name="positon" />
            <Field value={editItem?.company} label="Şirket" name="company" />
            <Field value={editItem?.phone} label="Telefon" name="phone" />
            <Field value={editItem?.email} label="Mail" name="email" />

            <div className="buttons" name="name">
              <button type="button" onClick={() => setIsModelOpen(false)}>
                Vazgeç
              </button>
              <button type="submit">Gönder</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
