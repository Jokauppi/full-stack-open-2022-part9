type Rating = 1 | 2 | 3;

interface Results {
    periodLength: number,
    trainingDays: number,
    targetHours: number,
    avgHours: number,
    targetReached: boolean,
    rating: Rating,
    ratingDesc: String
}

const calculateExercises = (training: Array<number>, target: number): Results => {
    
    const periodLength: number = training.length;
    const onlyTraining: Array<number> = training.filter((hours: number): boolean => hours > 0);
    const trainingDays: number = onlyTraining.length;
    const targetHours: number = target;
    const avgHours: number = onlyTraining.reduce((prev: number, current: number): number => prev + current, 0) / periodLength;
    const targetReached: boolean = avgHours >= targetHours;
    
    let rating: Rating;
    let ratingDesc: String;
    if (targetReached) {
        rating = 3;
        ratingDesc = "Target reached! You did your job.";
    } else {
        if (avgHours > targetHours / 2) {
            rating = 2;
            ratingDesc = "Almost there! You could have done a little more.";
        } else {
            rating = 1;
            ratingDesc = "Pretty far off! You barely got started.";
        }
    }

    return {
        periodLength,
        trainingDays,
        targetHours,
        avgHours,
        targetReached,
        rating,
        ratingDesc
    }
}

console.log(calculateExercises([0,2,2,2,0,0,0], 2));
console.log(calculateExercises([0,2,2,2], 2));
console.log(calculateExercises([5,2,2,2,0], 2));
