import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartTimeService } from '../../../features/administrator/part-time-employees/part-time.service';
import { PartTimeDetail } from '../../../features/administrator/part-time-employees/part-time.model';

@Component({
  selector: 'app-modal-popup',
  standalone: true,
  imports: [],
  templateUrl: './modal-popup.component.html',
  styleUrl: './modal-popup.component.css'
})
export class ModalPopupComponent implements OnInit {
  @Input() partTimeId? : number;
  detailPartTimeEmployee!: PartTimeDetail;
  openModal = true
  private router = inject(Router)
  private service = inject(PartTimeService)
  ngOnInit(): void {
    console.log(this.partTimeId);
    this.getDetailPartTimeEmployee(this.partTimeId!);
  }
  closeModal(){
    this.openModal = false
    this.router.navigate(['/managerial']) ;
  }

  private getDetailPartTimeEmployee(partTimeId: number){
    this.service.getDetailPartTimeEmployee(partTimeId).subscribe({
      next: (ress) => {
        console.log(ress.response);
        this.detailPartTimeEmployee = ress.response
      },
      error: (err) =>{
        console.log(err.message);
      }
    })
  }
}
