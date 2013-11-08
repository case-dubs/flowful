//When the document is ready, create the empty table
$(document).ready(function() {
	var anielaAliveness = [];
	var samuelAliveness = [];
	var chart;
	//This ajax call gets the .xml
		$.ajax({
			url: '/flowful/js/caseyconverter/flowfulPilotV1.xml',//The url plus '.xml'
			dataType: 'xml',
			}).done(function(myData){
				myData = parseXML(myData);
				//declare an array of objects called Samuel, which contains all of the data for Samuel
				var Samuel = myData.people.Samuel;
				var SamuelData = Samuel.entries;
				alivenessGraphDataGenerator(SamuelData, samuelAliveness, Samuel);
				//console.log(SamuelData);
				var Aniela = myData.people.Aniela;
				var AnielaData = Aniela.entries;
				alivenessGraphDataGenerator(AnielaData, anielaAliveness, Aniela);
				initialGraphGenerator(AnielaData, anielaAliveness, Aniela); //, SamuelData, samuelAliveness, Samuel
				console.log(Aniela);
				console.log(AnielaData);
				console.log(anielaAliveness);
				console.log(samuelAliveness);
				//alivenessStats(SamuelData);
				peopleStats(AnielaData);
				alivenessStats(AnielaData);
				alivenessDisplayGenerator(AnielaData);
				peopleDisplayGenerator(AnielaData);
				console.log(AnielaData.avgAliveness)
				$('#friends').on('click', function(){
					//need to figure out how to make chart equal to a variable so then I can add or remove series, like below
					 var chart = $('#highChartsContainer').highcharts();
					 console.log(samuelAliveness);

					 console.log(chart);


					 //samuelAliveness[0].data = [[Date.UTC(2013,9,16), 4], [Date.UTC(2013,9,25), 9]];
					 console.log(samuelAliveness[0].data)


       				 chart.addSeries(samuelAliveness[0]);
       				 console.log(chart);
					//friendComparer(AnielaData, anielaAliveness, Aniela, SamuelData, samuelAliveness, Samuel);
					chart.redraw();
				});
				//object that is an array of objects in the form of year, mo, day

				
				console.log(anielaAliveness);
				
			});

	//SAMPLE highcharts chart:

	

});

/*Functions for the top graph - parameters for these equations are likely (start date, end date) depending on how the time duration is set - if not using an api call*/
//Generates the stats display on the left side of the graph (on load and when clicked)
function alivenessDisplayGenerator(individualUserData){
	$('#flowState').append('Average Flow Level: <strong>' + individualUserData.avgAliveness + '</strong> <br>'+ 'Highest Flow State: <strong>' + individualUserData.highestAliveness + '</strong> <br>' + "Lowest Flow State: <strong>" + individualUserData.lowestAliveness + "</strong>");
}

function peopleDisplayGenerator(individualUserData){
	$('#people').append('Most Frequently With: <strong>' + individualUserData.mostFrequentlyW[0] + '</strong> <br>'+  'Greatest Moments With: <strong>' + individualUserData.greatestHappinessW[0] + '</strong> <br>' + 'Lowest Moments With: <strong>' + individualUserData.lowestHappinessW[0] + "</strong>" )

}

//still not functioning...
function friendComparer(individualUserData, userAlivenessArray, user, individualUserData2, userAlivenessArray2, user2){
	console.log('inside friend comparer');
	$('#highChartsContainer').hide();
	alivenessGraphDataGenerator(individualUserData2);
	initialGraphGenerator(individualUserData, userAlivenessArray, user, individualUserData2, userAlivenessArray2, user2);
}
//TBD
function activitiesDisplayGenerator(individualUserData){
	$('#activities').append('')
}
//pushes user alivesnnes data into an array - to be used in generating the initial user graph

function alivenessGraphDataGenerator(individualUserData, userAlivenessArray, user){
	//Object that will hold the total data for the user to be pushed inside the userAlivenessArray - format required is [{ name: , data:}]
	var holderObject = new Object();
	//array that will hold the user data points
	var name = user.name;
	holderObject.name = name;
	holderObject.type = "spline";
	var dataArray = [];
	for (var i=0; i<individualUserData.length; i++){

	//Need to parse the string into seperate year , mo , date
	var intArray = individualUserData[i].date.split(',');
	var timeArray = individualUserData[i].time.split(':');
	//var dateAliveness = "[Date.UTC(" + (individualUserData[i].date) + "), " + parseInt(individualUserData[i].aliveness) + "]";
	//Save data as [UTC(year,mo,day),aliveness#]:
	var dateAliveness = [Date.UTC(
			parseInt(intArray[0]),//Year
			(parseInt(intArray[1])-1),//Month (*offset by one because 0-11)
			parseInt(intArray[2]),//Day
			parseInt(timeArray[0]),//Hour
			parseInt(timeArray[1]),//Minutes
			parseInt(timeArray[2]) //Seconds
		),parseInt(individualUserData[i].aliveness)];
	
	//console.log(dateAliveness);

		//check whether any of the date instances are NaN
		if(isNaN(dateAliveness[0])){

		}
		else{
		//If !NaN, push this to the (aliveness) dataArray:
		dataArray.push(dateAliveness);
		}
	}
	//console.log(dataArray);
	//push the dataArray into an object that will hold both the name: and data: (array);
	holderObject.data = dataArray;
	//push the object into the userAlivenessArray
	userAlivenessArray.push(holderObject)
	console.log(userAlivenessArray);
};

//Generates the initial account landing page highcharts graph - displaying aliveness over time - , 
function initialGraphGenerator(individualUserData, userAlivenessArray, user){ //, individualUserData2, userAlivenessArray2, user2
	
	$('#highChartsContainer').highcharts({	
	  	chart: {
                type: 'spline',
                //backgroundColor: 'rgb(247,245,242)',
            },
        title: '',
	    xAxis: {
	        type: 'datetime',
	        /*dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
                
            }*/
	    },
	    yAxis: {
	        min: 1,
	        max: 8.5,
	        gridLineWidth: 0,
	        color: '#f7f5f2',
	        plotLines: [{
	            value: individualUserData.avgAliveness,
	        }]
	    },
	    tooltip: {
	        valueSuffix: "- Flow Level",
	    },
	    plotOptions: {
	    	spline: {
	    		lineWidth: 2, 
	    	}
	    },

	    series: [userAlivenessArray[0]] //[userAlivenessArray2[0],
	});

	////////////////////////////////////////////////////////////////////////////////////
	console.log(">>>>         AGDHSJ <<<");
	console.log(userAlivenessArray);
	//console.log(userAlivenessArray2);
}

//To be used when page loads and when user modifies the start and end date measured. Determines the start and end date for the data being measured. This will be reused in both the first two sections of the page
function dateRangeCalculator(){

	//start date

	//end date

	//Api call request that reloads page/section based off of time span requested OR trimming original data object/array based off of new specified date range 


}

//Calculates and display on page basic aliveness stats for the time range selected
function alivenessStats(individualUserData){
	
	//1. Avg. aliveness
	//Loop through all of the entries, 
		//counter to use in the loop
	var counter = 0;
		//tracks total of all aliveness values reported
	var totalAliveness = 0;
	for (var i=0; i<individualUserData.length; i++){
		
		
		var aliveness = parseInt(individualUserData[i].aliveness);
		//check whether aliveness was reported for this entry
		if(aliveness >=1 && aliveness != NaN){
			console.log('aliveness reported!');
			counter++;
			//if aliveness is reported, add the aliveness level reported to a total aliveness variable
			totalAliveness += aliveness;
		}		
	}

	//Get Avg. Aliveness: divide the total aliveness by the number of entries where aliveness was reported
	var avgAliveness = Math.round(totalAliveness/counter * 10)/10;
	individualUserData.avgAliveness = avgAliveness;

	//2. Highest aliveness reported
	
	var highestAliveness = 1;

	//loop through the alivesess values reported
	for (var i=0; i<individualUserData.length; i++){
		
		if (individualUserData[i].aliveness > highestAliveness && individualUserData[i].aliveness <= 7){
			highestAliveness = individualUserData[i].aliveness;
		}
	}
	//console.log(highestAliveness);
	individualUserData.highestAliveness = highestAliveness;

	//3. Lowest aliveness

	var lowestAliveness = 7;

	//loop through the alivesess values reported and find the lowest reported
	for (var i=0; i<individualUserData.length; i++){
		
		if (individualUserData[i].aliveness < lowestAliveness && 7>=individualUserData[i].aliveness <= 1){
			
			lowestAliveness = individualUserData[i].aliveness;
		}
	}
	individualUserData.lowestAliveness = lowestAliveness;

}


//Calculates and display on page basic people stats for the time range selected
function peopleStats(individualUserData){

	//GOAL OF THIS FUNCTION IS TO DETERMINE: 
	//1.Greatest happiness on avg. w/
	//2.Lowest happiness on avg. w/
	//3.Least frequently w/
	//4.. Most frequently w/: 
	//TO BE CONSTRUCTED...5. Comparing happiness level by people type depending on whether a user is w/ one person of that type vs. a group (eg: colleague vs. colleagues)


	//1. Categories: alone, core, acquaintances, strangers, colleagues [for starters, let's group singular and plural instances - eg: colleague and colleagues to see what that data looks like]
	//declare variables for each people category (and singular and plural for each category) and counters for each 
	var aloneCounter = 0;
	var aloneAlivenessTotal = 0;
	var coresCounter = 0;
	var coresTotal = 0;
	var coreCounter = 0;
	var coreTotal = 0;
	var coreCategoryTotal = 0;
	var coreCategoryTotal = 0;
	var acquaintancesCounter = 0;
	var acquaintancesTotal = 0;
	var acquaintanceCounter = 0;
	var acquaintanceTotal = 0;
	var acquaintancesCategoryTotal = 0;
	var colleaguesCounter = 0;
	var colleaguesTotal = 0;
	var colleagueCounter = 0;
	var colleagueTotal = 0;
	var colleaguesCategoryTotal = 0;
	var strangersCounter = 0;
	var strangersTotal = 0;
	var strangerCounter = 0;
	var strangerTotal = 0;
	var strangersCategoryTotal = 0;

	//for loop through all of the activities
	//Calculate the number of times user was in a particular category when reporting, add the aliveness level reported during each of those instances to a total for that category...to then be divided by the number of instances counter.
	for (var i = 0; i<individualUserData.length; i++){
		if(individualUserData[i].people.match(/alone/)) {
			aloneCounter++;
			aloneAlivenessTotal += parseInt(individualUserData[i].aliveness);

		}
		else if(individualUserData[i].people.match(/cores/)){
			coresCounter++;
			coresTotal += parseInt(individualUserData[i].aliveness);
			coreCategoryTotal += parseInt(individualUserData[i].aliveness);
		}
		else if(individualUserData[i].people.match(/core/)){
			coreCounter++;
			coreTotal += parseInt(individualUserData[i].aliveness);
			coreCategoryTotal += parseInt(individualUserData[i].aliveness);
		}
		else if(individualUserData[i].people.match(/acquaintances/)){
			acquaintancesCounter++;
			acquaintancesTotal += parseInt(individualUserData[i].aliveness);
			acquaintancesCategoryTotal += parseInt(individualUserData[i].aliveness);
		}
		else if(individualUserData[i].people.match(/acquaintance/)){
			acquaintanceCounter++;
			acquaintanceTotal += parseInt(individualUserData[i].aliveness);
			acquaintancesCategoryTotal += parseInt(individualUserData[i].aliveness);
			
		}
		else if(individualUserData[i].people.match(/colleagues/)){
			colleaguesCounter++;
			colleaguesTotal += parseInt(individualUserData[i].aliveness);
			colleaguesCategoryTotal += parseInt(individualUserData[i].aliveness);
		}
		else if(individualUserData[i].people.match(/colleague/)){
			colleagueCounter++;
			colleagueTotal += parseInt(individualUserData[i].aliveness);
			colleaguesCategoryTotal += parseInt(individualUserData[i].aliveness);
		}		
		else if(individualUserData[i].people.match(/strangers/)){
			strangersCounter++;
			strangersTotal += parseInt(individualUserData[i].aliveness);
			strangersCategoryTotal += parseInt(individualUserData[i].aliveness);
		}
		else if(individualUserData[i].people.match(/stranger/)){
			strangerCounter++;
			strangerTotal += parseInt(individualUserData[i].aliveness);
			strangersCategoryTotal += parseInt(individualUserData[i].aliveness);
		}
	}
	
	//Determine the number of instances reported for each people category type by adding up the 1-1, group counters for each category
	var coreTotalCounter = coreCounter + coresCounter;
	var acquaintancesTotalCounter = acquaintancesCounter + acquaintanceCounter;
	var colleaguesTotalCounter = colleaguesCounter + colleagueCounter;
	var strangersTotalCounter = strangersCounter + strangersCounter;

	//Calculate the average happiness level by people type
	var aloneAlivenessAvg = (aloneAlivenessTotal/aloneCounter);
	var coreAlivenessAvg = (coreCategoryTotal/coreTotalCounter);
	var acquaintancesAlivenessAvg = (acquaintancesCategoryTotal/acquaintancesTotalCounter);
	var colleaguesAlivenessAvg = (colleaguesCategoryTotal/colleaguesTotalCounter);
	var strangersAlivenessAvg = (strangersCategoryTotal/strangersTotalCounter);

	///Create an Object that contains average happiness for each activity type, to then sort which one was is the highest and lowest
	var alivenessObject = {'Alone': aloneAlivenessAvg, 'Core': coreAlivenessAvg, 'Acquaintances': acquaintancesAlivenessAvg, 'Colleagues': colleaguesAlivenessAvg, 'Strangers': strangersAlivenessAvg};
	//create a new object that will hold the sorted people frequencies from highest to lowest
	var alivenessSorter = [];
	for (var value in alivenessObject){
		alivenessSorter.push([value, alivenessObject[value]]);
		alivenessSorter.sort(function(a, b) {return a[1] - b[1]});
	};
	//console.log(alivenessSorter);
	//Check whether any of the AlivenessAvg's have a value of "Infinity", which would mean there were 0 instances that they were reported. 
	//If "Infinity" exists, remove that from the Object-array
	if(alivenessSorter[(alivenessSorter.length-1)][1] == 'Infinity'){
		alivenessSorter.pop();
	}
	//console.log(alivenessSorter);
	//2. Greatest happiness on avg. w/
	var greatestHappiness = alivenessSorter.pop();
	individualUserData.greatestHappinessW = greatestHappiness;
	//console.log(greatestHappiness);
	//3. Lowest aliveness on avg. w/
	var lowestHappiness = alivenessSorter.shift();
	individualUserData.lowestHappinessW = lowestHappiness;
	//console.log(lowestHappiness);
	//Create an Object that contains the total counter variables to then sort which one was most/least frequent
	var counterObject = {'Alone': aloneCounter, 'Core': coreTotalCounter, 'Acquaintances': acquaintancesTotalCounter, 'Colleagues': colleaguesTotalCounter, 'Strangers': strangersTotalCounter};
	console.log(counterObject);
	//create a new object that will hold the sorted people frequencies from highest to lowest
	var sortable = [];
	for (var value in counterObject){
		sortable.push([value, counterObject[value]]);
		sortable.sort(function(a, b) {return a[1] - b[1]});
	};

	//4. Least Frequently with:
	//remove the first object in the array - which has the lowest frequency
	var leastFrequent = sortable.shift();
	//console.log(leastFrequent);
	//5. Most frequently w/: 
	//remove the last object in the array - which has the highest frequency
	var mostFrequent = sortable.pop(); 
	individualUserData.mostFrequentlyW = mostFrequent;

	console.log("most often with: " + mostFrequent + "least often with: " + leastFrequent + "happiest with (on avg): " + greatestHappiness+ "least happy with (on avg):"+ lowestHappiness )


}	

//Calculates and display on page basic activity stats for the time range selected
function activityStats(){

	//Broad categories: work, leisure, hobbies, maintenance

	//Most frequently doing:

	//Greatest happiness on avg. for time range with, if available, must be 3 times to ensure that it isn't an outlier, when engaged in X activity:

	//Lowest aliveness when engaged in what category of activity

}

//Calculates, compares and displays on page basic stats for two users for the time range selected
function friendComparer(){



}

/*Functions for the second, "You and your environement", section of the page*/

//In this section, I need to build concentric circles with id's for each activty/people type and then change the background color based off of it's relative ranking for that time range
	//Need to create a way to detect which area of the cirlce is being moused over - to then trigger the Breakdown() events

//Calculates and ranks user's aliveness level by people type for the specified date duration
function youAndPeopleRanker(){

	//Calculate average aliveness level per people type for the specified time range

	//Rank from highest to lowest and asign a color for each ranking

}

//Calculates stats related to user's aliveness by activity depending on whether they are alone, 1-1 or in a group 
function youAndPeopleBreakdown(){

	//Call youAndActivityRanker() for stats on avg. aliveness by activity


}

//Calculates and ranks user's aliveness level by activity type for the specified date duration
function youAndActivityRanker(){

	//Calculate average aliveness level per activty type for the specified time range

	//Rank from highest to lowest and asign a color for each ranking

}

//For each activity type, reports which 3 activities (if enough data - 6 data points - is available) have the highest and lowest aliveness instance and reports the aliveness level of that instance. An alternative would be to calculate the average aliveness level for the activty subcategory, rather than by single instance
function youAndActivityBreakdown(){

	//loop that runs through each activty type
		//loop that runs through each instance within that activty type and ranks the instances from highest to lowest - in an array

		//then chooses the 3 highest and lowest instances and prints the sub-activity and the aliveness level for that instance 

}

//This function goes through the data and parses it and returns the parsed json
function parseXML(data){
	
	
	//Get the table element from the xml
	var table = $($(data).find("Table")[0]);
	
	
	
	//Create a variable to push the data into
	var allData = {
		people: {
			
		}
	};
	
	
	
	//Iterate through all the rows EXCEPT for the top 2, because they're populated with the titles of the columns
	for(var indexRow = 2; indexRow < table.find("Row").length; indexRow++){
		
		//Get the current row as an object we can play with
		var tmpRow = $(table.find("Row")[indexRow]);
		
		//The variable to hold the current entry
		var tmpEntry = {
			date: '',
			time: '',
			activityOverall: '',
			activityNarrow: '',
			people: '',
			aliveness: -1.0,
			concentration: -1.0,
			clarity: -1.0,
			anxiety: -1.0,
			notes: ''
		};
		
		
		//If the length is less than 3 elements, it hasn't been populated correctly
		if(tmpRow.find("Data").length < 3){
			//Data has not been filled in all the way. Probably just name and empty date
			continue; //Skip this for loop, goes to the next iteration.
		}
		
		
		
		////Get the name of the person who the entry belongs to
		var tmpName = $(tmpRow.find("Data")[0]).text();
		
		//Check if we don't have the person in the data
		if(allData.people[tmpName] == undefined){
			
			
			//Log that we are going to create data for the new person and their name
			//console.log("New person: " + tmpName);
			
			//Create an object for the person and set it into the data under their name
			allData.people[tmpName] = {
				name: tmpName,//The name
				data: {},//Their misc data (NOT entries, and not being populated)
				entries: []//The entries
			};
		}
		
		
		//For all of the elements in the row.....
		for(var i = 1; i < tmpRow.find("Data").length; i++){
			
			//Save the TEXT into this variable
			var tmpData = $(tmpRow.find("Data")[i]).text();
			
			//Switch which element we are on
			switch(i){
				case 0://Name
					//Already stored
					break;
				case 1://Date
					tmpEntry.date = tmpData;
					break;
				case 2://Time
					tmpEntry.time = tmpData;
					break;
				case 3://Activity
					tmpEntry.activityOverall = tmpData;
					break;
				case 4://Narrow
					tmpEntry.activityNarrow = tmpData;
					break;
				case 5://People
					tmpEntry.people = tmpData;
					break;
				case 6://Aliveness
					tmpEntry.aliveness = tmpData;
					break;
				case 7://Concentration
					tmpEntry.concentration = tmpData;
					break;
				case 8://Clarity
					tmpEntry.clarity = tmpData;
					break;
				case 9://Anxiety BUT COULD BE THEIR DESCRIPTION
					if(isNaN(tmpData)){//NOT A NUMBER
						console.log("Wasn't a number");
						tmpEntry.notes = tmpData;
					}else{//IS A NUMBER
						tmpEntry.anxiety = tmpData;
					}
					break;
				case 10://Notes
					tmpEntry.notes = tmpData;
					break;
				default://BROKEN
					console.log("BROKEN!!! ======");
			}//end switch/case
		}//end for loop for datas
		allData.people[tmpName].entries.push(tmpEntry);
	}//end for loop for rows
	
	
	//Log the object we now have
	//console.log(allData);
	//Give it back to the calling function
	return allData;
}
