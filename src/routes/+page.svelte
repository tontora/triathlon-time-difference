<script lang="ts">
	import dayjs from 'dayjs';
	import { Button, ComboBox, RadioButton, RadioButtonGroup } from 'carbon-components-svelte';
	import { startListMen } from './start-list-men';
	import { startListWomen } from './start-list-women';

	let startTime = dayjs();
	let displayTime = 0;
	let isStarted = false;
	let gender: 'men' | 'women' | undefined;
	let selectedAthleteId: string | undefined;
	let timePerUniv: Record<string, TimeList> = {};
	$: startList = gender ? startLists[gender] : [];
	let splitTimes: Record<string, number[]> = {};
	// $: rows = gender ? getUnivSplitTime(createUniversityList()) : undefined;
	// 最大周回数
	const maxCount = 6;
	const startLists = { men: startListMen, women: startListWomen };

	type TimeList = { athleteCount: number; athleteSplitTimes: Record<string, number[]> };
	function getElapsedTime() {
		return dayjs().diff(startTime, 'second', true);
	}

	function timeToString(timeBySeconds: number) {
		return dayjs(timeBySeconds * 1000)
			.subtract(9, 'hour')
			.format('H:mm:ss');
	}

	function initialize() {
		for (let item of startList) {
			splitTimes[item.id] = [];
		}
		alert(getUniversities(createUniversityList()));
		// timePerUniv = createUniversityList();
		isStarted = true;
		startTime = dayjs();
		setInterval(() => {
			displayTime = getElapsedTime();
		}, 1000);
	}

	function passage() {
		splitTimes[selectedAthleteId!].push(getElapsedTime());
		const athlete = startList[Number(selectedAthleteId) - 1];
		// timePerUniv[athlete.team].athleteSplitTimes[getName(athlete)].push(getElapsedTime());
		selectedAthleteId = undefined;
		splitTimes = splitTimes;
		timePerUniv = timePerUniv;
	}
	// 3人以上の大学を取得する。
	function getUniversities(univList: Record<string, TimeList>) {
		return Object.entries(univList)
			.filter(([key, value]) => key.includes('大学') && value.athleteCount >= 3)
			.map(([key]) => key);
	}
	// チームごとに選手の通過タイムを記録する
	function createUniversityList(): Record<string, TimeList> {
		let univList: Record<string, TimeList> = {};
		for (let athlete of startList) {
			univList[athlete.team] = {
				athleteCount: (univList[athlete.team]?.athleteCount ?? 0) + 1,
				athleteSplitTimes: { ...univList[athlete.team]?.athleteSplitTimes, [getName(athlete)]: [] },
			};
		}
		return univList;
	}

	// function getUnivSplitTime(
	// 	athleteTimes: Record<string, TimeList>,
	// ): { universityName: string; times: (number | undefined)[] }[] {
	// 	return Object.entries(athleteTimes)
	// 		.map(([key, value]) => {
	// 			if (value.athleteCount < 3) return undefined;
	// 			let timeList: number[] = [];
	// 			for (let i = 0; i < maxCount; i++) {
	// 				const sortedTimes =
	// 					Object.values(value.athleteSplitTimes)
	// 						.map((value) => value[i])
	// 						?.concat()
	// 						?.sort() ?? [];
	// 				if (!sortedTimes[2]) return;
	// 				timeList[i] = sortedTimes[0] + sortedTimes[1] + sortedTimes[2];
	// 			}
	// 			return { universityName: key, times: timeList };
	// 		})
	// 		.filter((x) => x?.universityName) as {
	// 		universityName: string;
	// 		times: (number | undefined)[];
	// 	}[];
	// }

	function getName({ lastName, firstName }: { lastName: string; firstName: string }) {
		return `${lastName} ${firstName}`;
	}
</script>

<!-- <p>{rows}</p> -->
<div class="control">
	<span>{timeToString(displayTime)}</span>
	<div class="radio">
		<RadioButtonGroup disabled={isStarted} bind:selected={gender}>
			<RadioButton labelText="女" value="women" />
			<RadioButton labelText="男" value="men" />
		</RadioButtonGroup>
	</div>
	<Button disabled={isStarted || !gender} on:click={initialize}>スタート</Button>
</div>
<div class="input-box">
	<ComboBox
		placeholder="No. or name"
		items={startList.map((item) => ({
			...item,
			text: `${item.id}: ${getName(item)} : ${item.team}`,
			key: item.id,
		}))}
		shouldFilterItem={(item, value) => {
			if (!value) return true;
			return item.text.split(':')[1].includes(value) || String(item.id).indexOf(value) === 0;
		}}
		disabled={!isStarted}
		bind:selectedId={selectedAthleteId}
	/>
	<Button disabled={!selectedAthleteId} on:click={passage}>通過</Button>
</div>

<style>
	.control {
		margin: 0.5rem;
	}

	.radio {
		display: inline-block;
	}

	.input-box {
		display: flex;
	}
</style>
