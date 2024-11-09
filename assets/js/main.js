// JavaScript để điều khiển việc hiển thị nội dung
function showSection(sectionId) {
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => {
    section.style.display = "none"; // Ẩn tất cả các phần
  });

  const sectionToShow = document.getElementById(sectionId);
  sectionToShow.style.display = "block"; // Hiển thị phần được chọn

  // Ẩn giao diện mặc định
  const defaultView = document.getElementById("default-view");
  defaultView.style.display = "none";
}

// Mặc định hiển thị giao diện mặc định
document.addEventListener("DOMContentLoaded", () => {
  const defaultView = document.getElementById("default-view");
  defaultView.style.display = "block"; // Hiển thị giao diện mặc định

  // Ẩn tất cả các phần chức năng khác
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => {
    section.style.display = "none";
  });
});

//Quản lý sách
// Mảng sách mẫu
let books = [
  {
    id: "1",
    code: "001",
    title: "Sách 1",
    author: "Tác giả 1",
    category: "Văn học",
    publisher: "NXB Văn học",
    year: "2020",
    quantity: 10,
  },
  {
    id: "2",
    code: "002",
    title: "Sách 2",
    author: "Tác giả 2",
    category: "Khoa học",
    publisher: "NXB Khoa học",
    year: "2019",
    quantity: 5,
  },
  {
    id: "3",
    code: "003",
    title: "Sách 3",
    author: "Tác giả 3",
    category: "Giáo dục",
    publisher: "NXB Giáo dục",
    year: "2021",
    quantity: 8,
  },
];

// Hàm lấy thông tin sách từ mảng hoặc API (ví dụ)
function getBookDetails(bookId) {
  const books = [
    {
      id: 1,
      code: "001",
      title: "Sách Tiêu biểu 1",
      author: "Tác giả A",
      category: "Khoa học",
      publisher: "NXB A",
      year: 2020,
      quantity: 5,
    },
    {
      id: 2,
      code: "002",
      title: "Sách Tiêu biểu 2",
      author: "Tác giả B",
      category: "Văn học",
      publisher: "NXB B",
      year: 2021,
      quantity: 10,
    },
    {
      id: 3,
      code: "003",
      title: "Sách Tiêu biểu 3",
      author: "Tác giả 3",
      category: "Thể loại 3",
      publisher: "NXB 3",
      year: "2022",
      quantity: 7,
    },
    // Thêm các sách khác ở đây
  ];

  return books.find((book) => book.id == bookId); // Tìm sách theo ID
}

// Hàm gán sự kiện cho các nút sửa và xóa độc giả trong danh sách
function renderReaderList(filteredReaders) {
  const readerList = document.getElementById("readerList");
  readerList.innerHTML = ""; // Xóa nội dung cũ

  if (filteredReaders.length === 0) {
    readerList.innerHTML = "<p>Không có độc giả phù hợp với tìm kiếm!</p>";
  } else {
    filteredReaders.forEach((reader) => {
      const readerItem = document.createElement("div");
      readerItem.classList.add("reader-item");
      readerItem.innerHTML = `
      <span class="reader-id">Mã: ${reader.id}</span>
      <span class="reader-name">${reader.name}</span>
      <button onclick="editReader('${reader.id}')">Sửa</button>
      <button onclick="deleteReader('${reader.id}', event)">Xóa</button>
    `;
      readerList.appendChild(readerItem);
    });
  }
}

// Hàm tìm kiếm sách
function searchBooks() {
  const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchInput) ||
      book.author.toLowerCase().includes(searchInput) ||
      book.code.toLowerCase().includes(searchInput) ||
      book.category.toLowerCase().includes(searchInput)
    );
  });

  renderBookList(filteredBooks);
}

// Gọi hàm tìm kiếm khi nhấn vào nút tìm kiếm
document.getElementById("search-button").addEventListener("click", searchBooks);

// Hàm mở modal để thêm sách
function addBook() {
  document.getElementById("bookForm").reset();
  document.getElementById("modal-title").innerText = "Thêm sách mới";
  document.getElementById("book-id-hidden").value = "";
  document.getElementById("bookModal").style.display = "block";
}

// Hiển thị modal thông tin sách
function showInfoBookModal(bookId) {
  const book = getBookDetails(bookId); // Lấy thông tin sách theo ID
  console.log(book); // Kiểm tra thông tin sách trong console

  if (book) {
    // Điền thông tin sách vào các phần tử trong modal
    document.getElementById("info-book-code").innerText = book.code;
    document.getElementById("info-book-title").innerText = book.title;
    document.getElementById("info-book-author").innerText = book.author;
    document.getElementById("info-book-category").innerText = book.category;
    document.getElementById("info-book-publisher").innerText = book.publisher;
    document.getElementById("info-book-year").innerText = book.year;
    document.getElementById("info-book-quantity").innerText = book.quantity;

    // Hiển thị modal
    document.getElementById("infoBookModal").style.display = "block";
  } else {
    console.error("Không tìm thấy sách với ID:", bookId);
  }
}

// Hàm hiển thị modal sửa sách với thông tin sách cụ thể
function editBook(bookId) {
  const book = getBookDetails(bookId); // Tìm sách cần sửa dựa trên bookId
  console.log(book); // Kiểm tra thông tin sách trong console

  if (book) {
    // Điền thông tin sách vào các trường trong form
    document.getElementById("book-id-hidden").value = book.id;
    document.getElementById("book-code").value = book.code;
    document.getElementById("book-title").value = book.title;
    document.getElementById("book-author").value = book.author;
    document.getElementById("book-category").value = book.category;
    document.getElementById("book-publisher").value = book.publisher;
    document.getElementById("book-year").value = book.year;
    document.getElementById("book-quantity").value = book.quantity;

    // Đặt tiêu đề modal và hiển thị modal
    document.getElementById("modal-title").innerText = "Sửa sách";
    document.getElementById("bookModal").style.display = "block";
  } else {
    console.error("Không tìm thấy sách với ID:", bookId);
  }
}

// Hàm hiển thị modal và điền thông tin sách
function showBookModal(isEdit, book) {
  const modal = document.getElementById("bookModal");
  const title = document.getElementById("modal-title");
  const form = document.getElementById("bookForm");

  if (isEdit && book) {
    title.textContent = "Sửa sách";
    document.getElementById("book-id-hidden").value = book.id;
    document.getElementById("book-code").value = book.code;
    document.getElementById("book-title").value = book.title;
    document.getElementById("book-author").value = book.author;
    document.getElementById("book-category").value = book.category;
    document.getElementById("book-publisher").value = book.publisher;
    document.getElementById("book-year").value = book.year;
    document.getElementById("book-quantity").value = book.quantity;
  } else {
    title.textContent = "Thêm sách mới";
    form.reset();
  }

  // Hiển thị modal
  modal.style.display = "block";
}

function closeBookModal() {
  document.getElementById("bookModal").style.display = "none";
}

function closeInfoBookModal() {
  document.getElementById("infoBookModal").style.display = "none";
}

// Xử lý khi người dùng nhấn ngoài modal để đóng
window.onclick = function (event) {
  const modals = [
    document.getElementById("bookModal"),
    document.getElementById("editBookModal"),
    document.getElementById("infoBookModal"),
  ];
  modals.forEach((modal) => {
    if (event.target === modal) modal.style.display = "none";
  });
};

// Hàm xóa sách
function deleteBook(bookId, event) {
  event.stopPropagation();
  if (confirm("Bạn có chắc muốn xóa sách có mã: " + bookId + "?")) {
    // Xóa phần tử HTML đại diện cho sách
    const bookElement = document.querySelector(
      `.book-item[data-book-id='${bookId}']`
    );
    if (bookElement) {
      bookElement.remove();
      // Cập nhật lại danh sách sách sau khi xóa
      books = books.filter((book) => book.id !== bookId);
      alert("Đã xóa sách có mã: " + bookId);
    } else {
      alert("Không tìm thấy sách có mã: " + bookId);
    }
  }
}

function saveBook(event) {
  event.preventDefault(); // Prevent form submission

  const bookId = document.getElementById("book-id-hidden").value;
  const updatedBook = {
    id: bookId,
    title: document.getElementById("book-title").value,
    author: document.getElementById("book-author").value,
    category: document.getElementById("book-category").value,
    publisher: document.getElementById("book-publisher").value,
    year: document.getElementById("book-year").value,
    quantity: document.getElementById("book-quantity").value,
  };

  // Update book in the array
  const bookIndex = books.findIndex((b) => b.id === bookId);
  if (bookIndex > -1) {
    books[bookIndex] = updatedBook;
    alert("Sửa sách thành công!");
    renderBookList(); // Re-render the book list after saving changes
  } else {
    alert("Không tìm thấy sách!");
  }

  // Close the modal
  closeBookModal();
}

// Initially render the list of books
renderBookList();


// Quản lý độc giả
// Mảng độc giả mẫu
let readers = [
  {
    id: "R001",
    name: "Nguyễn Văn A",
    birthday: "1990-01-01",
    address: "Hà Nội",
    cccd: "1234567890",
    phone: "0901234567",
    email: "a@example.com",
    expiryDate: "2025-12-31",
  },
  {
    id: "R002",
    name: "Trần Thị B",
    birthday: "1992-02-02",
    address: "TP Hồ Chí Minh",
    cccd: "0987654321",
    phone: "0912345678",
    email: "b@example.com",
    expiryDate: "2024-11-30",
  },
  {
    id: "R003",
    name: "Lê Minh C",
    birthday: "1988-03-03",
    address: "Đà Nẵng",
    cccd: "1122334455",
    phone: "0923456789",
    email: "c@example.com",
    expiryDate: "2026-10-15",
  },
];

// Hàm lấy thông tin độc giả từ mảng
function getReaderDetails(readerId) {
  return readers.find((reader) => reader.id === readerId);
}

// Hàm hiển thị danh sách độc giả
function renderReaderList(filteredReaders) {
  const readerList = document.getElementById("readerList");
  readerList.innerHTML = ""; // Xóa nội dung cũ

  if (filteredReaders.length === 0) {
    readerList.innerHTML = "<p>Không có độc giả phù hợp với tìm kiếm!</p>";
  } else {
    filteredReaders.forEach((reader) => {
      const readerItem = document.createElement("div");
      readerItem.classList.add("reader-item");
      readerItem.innerHTML = `
        <span class="reader-id">Mã: ${reader.id}</span>
        <span class="reader-name">${reader.name}</span>
        <button onclick="editReader('${reader.id}'); event.stopPropagation()">Sửa</button>
        <button onclick="deleteReader('${reader.id}', event); event.stopPropagation()">Xóa</button>
      `;
      readerList.appendChild(readerItem);
    });
  }
}

// Hàm tìm kiếm độc giả
function searchReaders() {
  const searchInput = document.getElementById("search-reader-input").value.trim().toLowerCase();
  const filteredReaders = readers.filter((reader) => {
    return (
      reader.name.toLowerCase().includes(searchInput) ||
      reader.id.toLowerCase().includes(searchInput) ||
      reader.phone.toLowerCase().includes(searchInput)
    );
  });

  renderReaderList(filteredReaders);
}

// Hàm mở modal để thêm độc giả
function showAddReaderModal() {
  document.getElementById("readerForm").reset();
  document.getElementById("modal-title").innerText = "Thêm độc giả mới";
  document.getElementById("reader-id-hidden").value = "";
  document.getElementById("readerModal").style.display = "block";
}

// Hàm hiển thị thông tin độc giả trong modal
function showInfoReaderModal(readerId) {
  const reader = getReaderDetails(readerId); // Lấy thông tin độc giả theo ID
  if (reader) {
    document.getElementById("info-reader-id").innerText = reader.id;
    document.getElementById("info-reader-name").innerText = reader.name;
    document.getElementById("info-reader-birthday").innerText = reader.birthday;
    document.getElementById("info-reader-address").innerText = reader.address;
    document.getElementById("info-reader-cccd").innerText = reader.cccd;
    document.getElementById("info-reader-phone").innerText = reader.phone;
    document.getElementById("info-reader-email").innerText = reader.email;
    document.getElementById("info-reader-expiry-date").innerText = reader.expiryDate;

    // Hiển thị modal
    document.getElementById("infoReaderModal").style.display = "block";
  } else {
    console.error("Không tìm thấy độc giả với ID: " + readerId);
  }
}

// Hàm đóng modal thông tin độc giả
function closeInfoReaderModal() {
  document.getElementById("infoReaderModal").style.display = "none";
}

// Hàm mở modal chỉnh sửa độc giả
function editReader(readerId) {
  const reader = getReaderDetails(readerId);
  if (reader) {
    document.getElementById("reader-id-hidden").value = reader.id;
    document.getElementById("reader-id").value = reader.id;
    document.getElementById("reader-name").value = reader.name;
    document.getElementById("reader-birthday").value = reader.birthday;
    document.getElementById("reader-address").value = reader.address;
    document.getElementById("reader-cccd").value = reader.cccd;
    document.getElementById("reader-phone").value = reader.phone;
    document.getElementById("reader-email").value = reader.email;
    document.getElementById("reader-expiry-date").value = reader.expiryDate;

    // Hiển thị modal chỉnh sửa
    document.getElementById("modal-title").innerText = "Chỉnh sửa thông tin độc giả";
    document.getElementById("readerModal").style.display = "block";
  }
}

// Hàm lưu độc giả (thêm hoặc chỉnh sửa)
function saveReader(event) {
  event.preventDefault();
  const readerId = document.getElementById("reader-id").value;
  const readerName = document.getElementById("reader-name").value;
  const readerBirthday = document.getElementById("reader-birthday").value;
  const readerAddress = document.getElementById("reader-address").value;
  const readerCccd = document.getElementById("reader-cccd").value;
  const readerPhone = document.getElementById("reader-phone").value;
  const readerEmail = document.getElementById("reader-email").value;
  const readerExpiryDate = document.getElementById("reader-expiry-date").value;

  // Kiểm tra xem là thêm hay chỉnh sửa
  const existingReader = getReaderDetails(readerId);
  if (existingReader) {
    // Chỉnh sửa độc giả
    existingReader.name = readerName;
    existingReader.birthday = readerBirthday;
    existingReader.address = readerAddress;
    existingReader.cccd = readerCccd;
    existingReader.phone = readerPhone;
    existingReader.email = readerEmail;
    existingReader.expiryDate = readerExpiryDate;
  } else {
    // Thêm độc giả mới
    readers.push({
      id: readerId,
      name: readerName,
      birthday: readerBirthday,
      address: readerAddress,
      cccd: readerCccd,
      phone: readerPhone,
      email: readerEmail,
      expiryDate: readerExpiryDate,
    });
  }

  // Đóng modal và cập nhật danh sách độc giả
  closeReaderModal();
  renderReaderList(readers);
}

// Hàm xóa độc giả
function deleteReader(readerId, event) {
  event.stopPropagation();
  const index = readers.findIndex((reader) => reader.id === readerId);
  if (index !== -1) {
    readers.splice(index, 1);
    renderReaderList(readers); // Cập nhật lại danh sách
  }
}

// Hàm đóng modal thêm/sửa độc giả
function closeReaderModal() {
  document.getElementById("readerModal").style.display = "none";
}

// Khi người dùng click vào dấu 'X' để đóng modal
document.querySelectorAll(".close").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.closest(".modal").style.display = "none";
  });
});


// Mượn - trả sách


// Lịch sử mượn sách
let borrowHistory = [];

// Lịch sử trả sách
let returnHistory = [];

// Xử lý mượn sách
function handleBorrowBook(event) {
  event.preventDefault(); // Ngừng gửi form

  const readerId = document.getElementById('doc-gia-id').value; // Lấy mã độc giả
  const bookId = document.getElementById('sach-id').value; // Lấy mã sách

  // Tìm độc giả và sách theo mã
  const reader = readers.find(r => r.id === readerId);
  const book = books.find(b => b.id === bookId);

  // Kiểm tra nếu độc giả hoặc sách không tồn tại
  if (!reader) {
    alert('Không tìm thấy độc giả với mã này!');
    return;
  }

  if (!book) {
    alert('Không tìm thấy sách với mã này!');
    return;
  }

  // Kiểm tra xem sách có còn trong kho hay không
  if (book.quantity <= 0) {
    alert('Sách này đã hết hàng!');
    return;
  }

  // Cập nhật lịch sử mượn sách
  borrowHistory.push({ readerId, bookId, borrowDate: new Date().toLocaleDateString() });

  // Giảm số lượng sách trong kho
  book.quantity--;

  // Thông báo mượn sách thành công
  alert(`Độc giả ${reader.name} đã mượn sách "${book.title}"`);

  // Reset form
  document.getElementById('borrow-form').reset();
}

// Xem lịch sử mượn sách
function viewBorrowHistory() {
  const historyContainer = document.getElementById('borrow-history');
  historyContainer.innerHTML = ''; // Xóa dữ liệu cũ

  // Hiển thị lịch sử mượn sách
  borrowHistory.forEach(entry => {
    const book = books.find(b => b.id === entry.bookId);
    const reader = readers.find(r => r.id === entry.readerId);
    const historyItem = document.createElement('div');
    historyItem.innerText = `Độc giả ${reader.name} đã mượn sách "${book.title}" vào ngày ${entry.borrowDate}`;
    historyContainer.appendChild(historyItem);
  });
}


// Xử lý trả sách
function handleReturnBook(event) {
  event.preventDefault(); // Ngừng gửi form

  const readerId = document.getElementById('return-doc-gia-id').value; // Lấy mã độc giả
  const bookId = document.getElementById('return-sach-id').value; // Lấy mã sách

  // Tìm độc giả và sách theo mã
  const reader = readers.find(r => r.id === readerId);
  const book = books.find(b => b.id === bookId);

  // Kiểm tra nếu độc giả hoặc sách không tồn tại
  if (!reader) {
    alert('Không tìm thấy độc giả với mã này!');
    return;
  }

  if (!book) {
    alert('Không tìm thấy sách với mã này!');
    return;
  }

  // Kiểm tra nếu sách đã được mượn
  const borrowEntry = borrowHistory.find(entry => entry.readerId === readerId && entry.bookId === bookId);

  if (!borrowEntry) {
    alert('Sách này chưa được mượn bởi độc giả này!');
    return;
  }

  // Cập nhật lịch sử trả sách
  returnHistory.push({ readerId, bookId, returnDate: new Date().toLocaleDateString() });

  // Tăng số lượng sách trong kho
  book.quantity++;

  // Thông báo trả sách thành công
  alert(`Độc giả ${reader.name} đã trả sách "${book.title}"`);

  // Reset form
  document.getElementById('return-form').reset();
}

// Xem lịch sử trả sách
function viewReturnHistory() {
  const historyContainer = document.getElementById('return-history');
  historyContainer.innerHTML = ''; // Xóa dữ liệu cũ

  // Hiển thị lịch sử trả sách
  returnHistory.forEach(entry => {
    const book = books.find(b => b.id === entry.bookId);
    const reader = readers.find(r => r.id === entry.readerId);
    const historyItem = document.createElement('div');
    historyItem.innerText = `Độc giả ${reader.name} đã trả sách "${book.title}" vào ngày ${entry.returnDate}`;
    historyContainer.appendChild(historyItem);
  });
}
