<script lang="ts">
	import dayjs from 'dayjs';
	import { Button, ComboBox, RadioButton, RadioButtonGroup } from 'carbon-components-svelte';
	import { startListMen } from './start-list-men';
	import { startListWomen } from './start-list-women';
	import { UniversityRow } from './university-list';

	const startLists = { men: startListMen, women: startListWomen };

	// 最大周回数
	const maxCount = 6;
	let startTime = dayjs();
	let displayTime = 0;
	let isStarted = false;
	let gender: 'men' | 'women' | undefined;
	let selectedAthleteId: string | undefined;
	let splitTimes: Record<string, number[]> = {};
	let universityRows: UniversityRow[] = [];

	$: startList = gender ? startLists[gender] : [];

	function getElapsedTime() {
		return dayjs().diff(startTime, 'second', true);
	}

	function timeToString(timeBySeconds: number) {
		return dayjs(timeBySeconds * 1000)
			.subtract(9, 'hour')
			.format('H:mm:ss');
	}

	function initialize() {
		for (const item of startList) {
			if (!universityRows.find((x) => x.name === item.team))
				universityRows.push(new UniversityRow(item.team));
			universityRows.find((x) => x.name === item.team)?.addAthlete(getName(item));
		}
		universityRows = universityRows;
		isStarted = true;
		startTime = dayjs();
		setInterval(() => {
			displayTime = getElapsedTime();
		}, 1000);
	}

	function passage() {
		splitTimes[selectedAthleteId!].push(getElapsedTime());
		const athlete = startList[Number(selectedAthleteId) - 1];
		selectedAthleteId = undefined;
		splitTimes = splitTimes;
	}

	function filterRow(rows: UniversityRow[]) {
		return rows.filter(
			(university) => university.athletes.length >= 3 && university.name.includes('大学'),
		);
	}

	function getName({ lastName, firstName }: { lastName: string; firstName: string }) {
		return `${lastName} ${firstName}`;
	}
</script>

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
