import React, { useEffect, useState } from "react";
import axios from "../../api";
import { FiTrash2, FiEdit2 } from "react-icons/fi";

const ShowItem = () => {
  const [items, setItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchItems();
  }, []);

  
  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/items/${selectedItem._id}`);
      setItems(items.filter((item) => item._id !== selectedItem._id));
      setShowDeleteModal(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  
  const openUpdateModal = (item) => {
    setSelectedItem(item);
    setUpdateForm({
      name: item.itemname,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
    });
    setShowUpdateModal(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(
        `/update-item/${selectedItem._id}`,
        updateForm
      );
      setItems(
        items.map((item) =>
          item._id === selectedItem._id ? response.data : item
        )
      );
      setShowUpdateModal(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Menu Items
      </h1>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center h-[60px]">
              <div className="w-[60px] h-[60px] flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow px-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.itemname}
                  </h2>
                  <span className="text-green-600 font-medium">
                    ${item.price}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                  <p className="text-gray-600 text-sm truncate max-w-md">
                    {item.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200"
                    onClick={() => openUpdateModal(item)}
                    title="Update Item"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition-colors duration-200"
                    onClick={() => openDeleteModal(item)}
                    title="Delete Item"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      {showDeleteModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-96 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Confirm Delete
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <strong className="text-red-400">{selectedItem.itemname}</strong>?
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      
      {showUpdateModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-[500px] shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Update Item
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateSubmit();
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-300 mb-1 block">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={updateForm.name}
                    onChange={handleUpdateChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-gray-300 mb-1 block">Price</span>
                  <input
                    type="text"
                    name="price"
                    value={updateForm.price}
                    onChange={handleUpdateChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-300 mb-1 block">Category</span>
                  <input
                    type="text"
                    name="category"
                    value={updateForm.category}
                    onChange={handleUpdateChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-gray-300 mb-1 block">Description</span>
                <textarea
                  name="description"
                  value={updateForm.description}
                  onChange={handleUpdateChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                  required
                />
              </label>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowItem;
