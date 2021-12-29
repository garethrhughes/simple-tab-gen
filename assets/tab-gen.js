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

const init = () => {
  const template = `
    <input type="text" class="text-3xl" name="title" placeholder="Title" />
    <table>
      <tr><td>e</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      <tr><td>B</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      <tr><td>G</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      <tr><td>D</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      <tr><td>A</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
      <tr><td>E</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    </table>
    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      +
    </button>
  `;

  const row = document.createElement("div");
  row.setAttribute("class", "tab-row p-5");
  row.innerHTML = template;

  row.addEventListener("click", (e) => {
    if (
      [...document.querySelectorAll("table tr td:not(:first-child)")].indexOf(
        e.target
      ) === -1
    ) {
      return;
    }

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "note");
    input.setAttribute("value", e.target.innerText || 0);

    e.target.appendChild(input);
    input.focus();
    input.select();
  });

  row.getElementsByTagName("button")[0].addEventListener("click", () => {
    [...row.getElementsByTagName("tr")].forEach((tr) => {
      tr.appendChild(document.createElement("td"));
    });
  });

  document.getElementById("tab-container").append(row);
};

window.addEventListener("DOMContentLoaded", function () {
  init();

  document.getElementById("add-row").addEventListener("click", () => {
    init();
  });
});
