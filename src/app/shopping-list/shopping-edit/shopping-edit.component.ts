import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @Output() ingredientAdded = new EventEmitter<{name: string, amount: string}>();

  onAddIngredient(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    this.ingredientAdded.emit({
      name: nameInput.value,
      amount: amountInput.value
    })
  }

}
