import React, { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    account_name: '',
    email: '',
  });

  // Очищаємо поля форми при створенні акаунта або заповнюємо при редагуванні
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        name: initialData.name || '',
        account_name: initialData.account_name || '',
        email: initialData.email || '',
      });
    } else if (isOpen && !initialData) {
      setFormData({ name: '', account_name: '', email: '' }); // очищаємо форму при створенні акаунта
    }
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // Зберігаємо дані
    onRequestClose(); // Закриваємо модальне вікно
  };

  if (!isOpen) return null; // Якщо модальне вікно не відкрите, нічого не рендеримо

  return (
    <div className="modal fade show" tabIndex={-1} style={{ display: 'block' }} aria-hidden={!isOpen}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{initialData ? 'Edit Account' : 'Create Account'}</h5>
            <button type="button" className="btn-close" onClick={onRequestClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="account_name" className="form-label">Account Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="account_name"
                  name="account_name"
                  value={formData.account_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
