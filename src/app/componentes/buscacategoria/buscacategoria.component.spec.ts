import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscacategoriaComponent } from './buscacategoria.component';

describe('BuscacategoriaComponent', () => {
  let component: BuscacategoriaComponent;
  let fixture: ComponentFixture<BuscacategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscacategoriaComponent]
    });
    fixture = TestBed.createComponent(BuscacategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
