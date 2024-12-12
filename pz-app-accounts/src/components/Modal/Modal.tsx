import React, {useState, useEffect} from 'react';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
}

const Modal: React.FC<ModalProps> = ({isOpen, onRequestClose, onSave, initialData}) => {
  const [formData, setFormData] = useState({
    name: '',
    account: '',
    email: '',
    status: '',
    start_date: '',
    expiration_date: '',
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        name: initialData.name || '',
        account: initialData.account_name || '',
        email: initialData.email || '',
        start_date: new Date(initialData.start_date * 1000).toISOString().split('T')[0] || '',
        expiration_date: new Date(initialData.expiration_date * 1000).toISOString().split('T')[0] || '',
        status: initialData.status || '',
      });
    } else if (isOpen && !initialData) {
      const currentDate = new Date();
      const nextMonthDate = new Date();
      nextMonthDate.setMonth(currentDate.getMonth() + 1);

      setFormData({
        name: '',
        account: '',
        email: '',
        start_date: currentDate.toISOString().split('T')[0],
        expiration_date: nextMonthDate.toISOString().split('T')[0],
        status: '',
      });
    }
  }, [isOpen, initialData]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onRequestClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show" tabIndex={-1} style={{display: 'block'}} aria-hidden={!isOpen}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{initialData ? 'Edit Account' : 'Create Account'}</h5>
            <button type="button" className="btn-close" onClick={onRequestClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name*</label>
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
                <label htmlFor="account" className="form-label">Account*</label>
                <input
                  type="text"
                  className="form-control"
                  id="account"
                  name="account"
                  value={formData.account}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Example select</label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={formData.status || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Processing">Processing</option>
                  <option value="Disable">Disable</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email*</label>
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
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="start_date" className="form-label">Start date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="start_date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="expiration_date" className="form-label">Expiration date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="expiration_date"
                    name="expiration_date"
                    value={formData.expiration_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={onRequestClose}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Modal;
