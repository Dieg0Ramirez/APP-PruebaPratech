import { Directive,Input,ViewContainerRef,ComponentFactoryResolver } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { FieldConfig } from '../../field.interface';
import { InputComponent} from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { DateComponent } from "../date/date.component";
import { RadiobuttonComponent } from "../radiobutton/radiobutton.component";
import { SelectComponent } from "../select/select.component";
const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent
};
@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }
}
