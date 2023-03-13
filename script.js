// First, two variables are defined: todoList as an empty array, and itemInput and itemList as the DOM elements with IDs "itemInput" and "itemList".
var todoList = [];
var itemInput = document.getElementById("itemInput");
var itemList = document.getElementById("itemList");

// The addItem function is defined, which is called when the user clicks on the "Add" button in the HTML page.
function addItem() {
  var itemText = itemInput.value;

  // If itemText is empty, the function returns and does nothing. If itemText is not empty, it is added to the todoList array.
  if (itemText === "") {
    return;
  }

  todoList.push(itemText);

  // A new list item (<li>) is created and its textContent property is set to itemText.
  var listItem = document.createElement("li");
  listItem.textContent = itemText;

  // The opacity of the new list item is initially set to 0, so that it can be faded in later. The new list item is added to the itemList DOM element.
  listItem.style.opacity = 0;

  // The new list item is added to html.
  itemList.appendChild(listItem);

  // A fadeEffect interval is created, which fades in the new list item by gradually increasing its opacity value from 0 to 1. Once the opacity reaches 1, the interval is cleared.
  var fadeEffect = setInterval(function () {
    if (listItem.style.opacity < 1) {
      listItem.style.opacity = parseFloat(listItem.style.opacity) + 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 100);

  // A delete button (<button>) is created and its textContent is set to "X".
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "X";

  // An event listener is added to the delete button, which is triggered when the button is clicked. When clicked, the item is removed from the todoList array, and a new fadeEffect interval is created to fade out the item by gradually decreasing its opacity value from 1 to 0. Once the opacity reaches 0, the interval is cleared and the item is removed from the DOM using the remove() method.
  deleteButton.addEventListener("click", function () {
    var itemIndex = todoList.indexOf(itemText);
    todoList.splice(itemIndex, 1);

    var fadeEffect = setInterval(function () {
      if (listItem.style.opacity > 0) {
        listItem.style.opacity = parseFloat(listItem.style.opacity) - 0.1;
      } else {
        clearInterval(fadeEffect);
        listItem.remove();
      }
    }, 100);
  });

  // Finally, the delete button is added to the new list item, and the value of itemInput is cleared.
  listItem.appendChild(deleteButton);

  itemInput.value = "";
}
