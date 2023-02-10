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

	getTeamTime(count: number): number | undefined {
		return -1;
	}
}

type Athlete = {
	name: string;
	splitTimes: number[];
};
