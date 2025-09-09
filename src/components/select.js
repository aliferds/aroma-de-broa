let adb_select, selectElement, div_a, div_b, div_c;
adb_select = document.getElementsByClassName("adb-select");
for (let count_i = 0; count_i < adb_select.length; count_i++) {
  selectElement = adb_select[count_i].getElementsByTagName("select")[0];
  div_a = document.createElement("DIV");
  div_a.setAttribute("class", "select-selected");
  div_a.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
  adb_select[count_i].appendChild(div_a);
  div_b = document.createElement("DIV");
  div_b.setAttribute("class", "select-items select-hide");
  for (let count_j = 1; count_j < selectElement.length; count_j++) {
    div_c = document.createElement("DIV");
    div_c.innerHTML = selectElement.options[count_j].innerHTML;
    div_c.addEventListener("click", function(e) {
        let sameAsSelected, count_i, select, prevSibling;
        select = this.parentNode.parentNode.getElementsByTagName("select")[0];
        prevSibling = this.parentNode.previousSibling;
        for (count_i = 0; count_i < select.length; count_i++) {
          if (select.options[count_i].innerHTML == this.innerHTML) {
            select.selectedIndex = count_i;
            prevSibling.innerHTML = this.innerHTML;
            sameAsSelected = this.parentNode.getElementsByClassName("same-as-selected");
            for (let k = 0; k < sameAsSelected.length; k++) {
              sameAsSelected[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        prevSibling.click();
    });
    div_b.appendChild(div_c);
  }
  adb_select[count_i].appendChild(div_b);
  div_a.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(element) {
  let selectItems, selectSelected, arrNo = [];
  selectItems = document.getElementsByClassName("select-items");
  selectSelected = document.getElementsByClassName("select-selected");
  for (let i = 0; i < selectSelected.length; i++) {
    if (element == selectSelected[i]) {
      arrNo.push(i)
    } else {
      selectSelected[i].classList.remove("select-arrow-active");
    }
  }
  for (let i = 0; i < selectItems.length; i++) {
    if (arrNo.indexOf(i)) {
      selectItems[i].classList.add("select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);