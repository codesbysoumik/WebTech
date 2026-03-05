document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("student-form");
  const nameInput = document.getElementById("student-name");
  const rollInput = document.getElementById("student-roll");
  const addBtn = document.getElementById("add-btn");
  const list = document.getElementById("student-list");
  const totalCountP = document.getElementById("total-count");
  const presenceCountP = document.getElementById("presence-count");
  const searchInput = document.getElementById("search-input");
  const sortBtn = document.getElementById("sort-btn");
  const highlightFirstBtn = document.getElementById("highlight-first-btn");

  // initialize
  addBtn.disabled = true;
  updateCounts();

  // Enable/disable Add button based on name input
  nameInput.addEventListener("input", () => {
    addBtn.disabled = nameInput.value.trim() === "";
  });

  // Form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addStudent();
  });

  // Search/filter
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    Array.from(list.children).forEach((li) => {
      const name = li.querySelector(".student-text").dataset.name.toLowerCase();
      li.style.display = name.includes(q) ? "" : "none";
    });
  });

  // Sort
  sortBtn.addEventListener("click", () => {
    const items = Array.from(list.children);
    items.sort((a, b) => {
      const an = a.querySelector(".student-text").dataset.name.toLowerCase();
      const bn = b.querySelector(".student-text").dataset.name.toLowerCase();
      return an.localeCompare(bn);
    });
    items.forEach((i) => list.appendChild(i));
  });

  // Highlight first
  highlightFirstBtn.addEventListener("click", () => {
    Array.from(list.children).forEach((li) => li.classList.remove("highlight"));
    const first = list.querySelector("li.student-item");
    if (first) first.classList.add("highlight");
  });

  function addStudent() {
    const name = nameInput.value.trim();
    const roll = rollInput.value.trim();
    if (name === "") {
      alert("Please enter a student name");
      return;
    }

    const li = document.createElement("li");
    li.className = "student-item";

    // left content: present checkbox + text
    const left = document.createElement("div");
    left.className = "left";

    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.className = "present-checkbox";

    const span = document.createElement("span");
    span.className = "student-text";
    span.dataset.name = name;
    span.dataset.roll = roll;
    span.textContent = (roll ? roll + " – " : "") + name;

    left.appendChild(chk);
    left.appendChild(span);

    // controls
    const controls = document.createElement("div");
    controls.className = "controls";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn-edit";
    editBtn.textContent = "Edit";

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn-delete";
    delBtn.textContent = "Delete";

    controls.appendChild(editBtn);
    controls.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(controls);

    // events
    chk.addEventListener("change", () => {
      li.classList.toggle("present", chk.checked);
      updateCounts();
    });

    editBtn.addEventListener("click", () => {
      const currentName = span.dataset.name;
      const currentRoll = span.dataset.roll;
      const newRoll = prompt(
        "Enter roll number:",
        currentRoll === undefined ? "" : currentRoll,
      );
      if (newRoll === null) return; // cancel
      const newName = prompt("Enter student name:", currentName);
      if (newName === null) return; // cancel
      if (newName.trim() === "") {
        alert("Name cannot be empty");
        return;
      }
      span.dataset.name = newName.trim();
      span.dataset.roll = (newRoll || "").trim();
      span.textContent =
        (span.dataset.roll ? span.dataset.roll + " – " : "") +
        span.dataset.name;
      updateCounts();
    });

    delBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this student?")) {
        li.remove();
        updateCounts();
      }
    });

    list.appendChild(li);

    // clear inputs
    nameInput.value = "";
    rollInput.value = "";
    addBtn.disabled = true;

    updateCounts();
  }

  function updateCounts() {
    const total = list.querySelectorAll("li.student-item").length;
    const present = list.querySelectorAll("li.student-item.present").length;
    const absent = total - present;
    totalCountP.textContent = `Total students: ${total}`;
    presenceCountP.textContent = `Present: ${present}, Absent: ${absent}`;
  }
});
