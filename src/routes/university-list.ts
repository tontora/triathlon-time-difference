export class UniversityRow {
	name: string;
	athletes: Athlete[];
	constructor(universityName: string) {
		this.name = universityName;
		this.athletes = [];
	}

	addAthlete(athleteName: string) {
		this.athletes.push({ name: athleteName, splitTimes: [] });
	}
	setAthleteTime({ athleteName, time }: { athleteName: string; time: number }) {
		this.athletes.find((x) => x.name === athleteName)?.splitTimes.push(time);
	}
}

type Athlete = {
	name: string;
	splitTimes: number[];
};
