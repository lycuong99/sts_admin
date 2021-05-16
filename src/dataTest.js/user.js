
const User = (id, name, email, isDeleted, isAdmin, address, phone, gender) => {
    return { id, name, email, isDeleted, isAdmin, address, phone, gender };
};

export const users = [
    User(1, 'Ly Van Cuong', 'lycuong99@gmail.com', false, true, 'Binh Duong', '0979568357', true),
    User(2, 'Ly Van Cuong', 'hoanganh99@gmail.com', false, true, 'Binh Duong', '0979568357', true),
    User(3, 'Ly Van Cuong', 'thanhtong99@gmail.com', false, true, 'Binh Duong', '0979568357', true),
    User(4, 'Ly Van Cuong', 'lycuong99@gmail.com', false, true, 'Ho Chi Minh', '0979568357', true),
    User(5, 'Ly Van Cuong', 'lycuong99@gmail.com', false, true, 'Binh Duong', '0979568357', true),
];