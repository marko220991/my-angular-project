import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  @ViewChild('f') submittedForm: NgForm;
  subscription: Subscription;
  editMode = false;
  edditedItemIndex: number;
  edditedItem: Ingredient;

  data = {
    name: '',
    amount: ''
  }

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.edditedItemIndex = index;
        this.editMode = true;
        this.edditedItem = this.slService.getIngredient(index);
        this.submittedForm.setValue({
          name: this.edditedItem.name,
          amount: this.edditedItem.amount
        });
      }
    );
  }

  onSubmit() {
    const ingName = this.submittedForm.value.name;
    const ingAmount = this.submittedForm.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.slService.updateIngredient(this.edditedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient); 
    }
    this.editMode = false;
    this.submittedForm.reset();
  }

  onClearForm() {
    this.submittedForm.reset();
    this.editMode = false;
  }

  onDeleteItem() {
    this.onClearForm();
    this.slService.deleteIngredient(this.edditedItemIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
