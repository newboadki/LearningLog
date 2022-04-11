import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearningLogComponent } from './learning-log.component';
import { LearningLogService } from '../services/learning-log-service';
import { AuthService } from '../../authentication/services/auth-service';

describe('LearningLogComponent', () => {
  let component: LearningLogComponent;
  let fixture: ComponentFixture<LearningLogComponent>;
  let serviceSpy: jasmine.SpyObj<LearningLogService>;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('LearningLogService', ['fetchLogs']);
    await TestBed.configureTestingModule({
      declarations: [LearningLogComponent],
      providers: [{ provide: LearningLogService, useValue: serviceSpy }],
    }).compileComponents();
    fixture = TestBed.createComponent(LearningLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchLogs once', () => {
    component.fetchLogs();

    expect(serviceSpy.fetchLogs.calls.count())
      .withContext('one call to fetchLogs')
      .toBe(2);
  });
});
