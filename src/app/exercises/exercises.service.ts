import { Injectable } from '@angular/core';
import { Exercise } from './exercise.interface';
import exercise01 from './01 - Observable creation';
import exercise02 from './02 - Mapping and filtering';
import exercise03 from './03 - Flattening observables';
import exercise04 from './04 - Combining observables';
import exercise05 from './05 - Batching and combining observables';
import exercise06 from './06 - Refactoring nested subscriptions';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  private exercises: Exercise[] = [
    exercise01,
    exercise02,
    exercise03,
    exercise04,
    exercise05,
    exercise06
  ];

  getExercises(): Exercise[] {
    return [...this.exercises];
  }

  getExerciseById(id: string): Exercise | undefined {
    return this.exercises.find(exercise => exercise.id === id);
  }

  addExercise(exercise: Exercise): void {
    this.exercises.push(exercise);
  }

  getExerciseCount(): number {
    return this.exercises.length;
  }
}
