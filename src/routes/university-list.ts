export class UniversityRow {
	name: string;
	athletes: Athlete[];
	constructor(universityName: string) {
		this.name = universityName;
		this.athletes = [];
	}

	addAthlete({ name }: { name: string }) {
		this.athletes.push({ name: name, splitTimes: [] });
	}

	setAthleteTime({ name: athleteName, time }: { name: string; time: number }) {
		this.athletes.find((x) => x.name === athleteName)?.splitTimes.push(time);
	}

	getTeamTime(count: number): { time: number } | undefined {
		const sortedTimes: (number | undefined)[] = this.athletes
			.map((x) => x.splitTimes[count])
			.filter((x) => x)
			.sort((a, b) => a! - b!);
		if (!sortedTimes[2]) return;
		const threeAthletes = sortedTimes.slice(0, 3);
		return {
			time: threeAthletes.map((x) => x).reduce((sum, element) => sum! + element!)!
		};
	}
}

type Athlete = {
	name: string;
	splitTimes: (number | undefined)[];
};
