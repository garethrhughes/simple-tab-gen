tailwind.config = {
  theme: {
    extend: {
      colors: { clifford: "#2A2F36" },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
    },
  },
};

const createInput = (node, value) => {
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "note");
  input.setAttribute("value", value);

  input.addEventListener("keyup", () => {
    if (input.value.length * 14 > input.offsetWidth) {
      input.style.width = input.value.length * 14 + "px";
    }
  });

  input.addEventListener("change", () => {
    input.value = input.value.trim();
    if (input.value.length * 14 > input.offsetWidth) {
      input.style.width = input.value.length * 14 + "px";
    }
  });

  input.addEventListener("focus", () => {
    input.select();
  });

  node.append(input);

  if (input.value.length * 14 > input.offsetWidth) {
    input.style.width = input.value.length * 14 + "px";
  }

  return input;
};

const click = (e) => {
  if (
    [...document.querySelectorAll("table tr td:not(:first-child)")].indexOf(
      e.target
    ) === -1
  ) {
    return;
  }

  if (e.target.firstChild !== null) {
    e.target.firstChild.focus();
    return;
  }

  const input = createInput(e.target, 0);

  input.focus();
};

const addColumn = (row) => {
  [...row.getElementsByTagName("tr")].forEach((tr) => {
    const td = document.createElement("td");
    const count = parseInt(tr.getAttribute("data-count"));

    tr.setAttribute("data-count", count + 1);
    td.setAttribute("data-ref", tr.getAttribute("data-string") + count);

    tr.appendChild(td);
  });
};

const init = (count = 10, title = "") => {
  const template = `
    <input type="text" class="text-3xl" name="title" placeholder="Title" />
    <table>
      <tr data-count=0 data-string=e><td>e</td></tr>
      <tr data-count=0 data-string="B"><td>B</td></tr>
      <tr data-count=0 data-string="G"><td>G</td></tr>
      <tr data-count=0 data-string="D"><td>D</td></tr>
      <tr data-count=0 data-string="A"><td>A</td></tr>
      <tr data-count=0 data-string="E"><td>E</td></tr>
    </table>
    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      +
    </button>
  `;

  const row = document.createElement("div");
  row.setAttribute("class", "tab-row p-5");
  row.innerHTML = template;

  if (title != "") {
    row.querySelector('input[name="title"]').value = title;
  }

  row.addEventListener("click", click);
  row.getElementsByTagName("button")[0].addEventListener("click", (e) => {
    addColumn(row);
  });

  [...Array(count)].forEach(() => addColumn(row));

  document.getElementById("tab-container").append(row);

  return row;
};

const save = () => {
  let data = "";
  [...document.querySelectorAll("table")].forEach((table) => {
    const elements = table.querySelectorAll("td[data-ref]");

    data += "L=" + elements.length / 6 + ":";
    data += "T=" + encodeURIComponent(table.previousElementSibling.value) + ":";

    elements.forEach((td) => {
      if (td.firstChild && td.firstChild.value != "") {
        data +=
          td.getAttribute("data-ref") +
          "=" +
          encodeURIComponent(td.firstChild.value) +
          ":";
      }
    });

    data += ";";
  });

  location.hash = data;

  navigator.clipboard.writeText(location);

  alert("Copied to clipboard: " + location);
};

window.addEventListener("DOMContentLoaded", function () {
  if (location.hash) {
    location.hash.split(";").forEach((table) => {
      if (table.length > 0) {
        const notes = table.replace(/^#/, "").split(":");
        const tableLength = notes.shift();
        const tableTitle = notes.shift();

        const tableElement = init(
          parseInt(tableLength.split("=")[1]),
          decodeURIComponent(tableTitle.split("=")[1])
        );

        notes.forEach((note) => {
          const noteData = note.split("=");

          const node = tableElement.querySelectorAll(
            'td[data-ref="' + noteData[0] + '"]'
          );

          if (node.length > 0) {
            createInput(node[0], decodeURIComponent(noteData[1]));
          }
        });
      }
    });
  } else {
    init();
  }

  document.getElementById("add-row").addEventListener("click", () => {
    init();
  });

  document.getElementById("save").addEventListener("click", () => {
    save();
  });
});
