# DGTL Doughnut visualisations
This github repository contains the scripts and datafiles used for the interactive visualisations of the [DGTLdoughnut website](https://www.dgtldoughnut.com/), which will give you insights into DGTL festival’s systems and their related footprint, and will provide you with a deeper understanding on how festivals can and are taking measures to become more sustainable and climate neutral places.

We strongly believe that it's essential to share knowledge on and enhance the replicability of this important topic, which is why we elaborated on the specifics of our methodology here (add link PDF). This github repository contains the visuals that connect this method. It contains five folders that are directly used at the webstie: the Doughnut, Energy, Materials, Mobility and Water, one folder with older versions of visualisation and the appendix to the methodology paper. Below a more in depth explanation of each visual is given.

#### Overall usage guide
To start working with these visuals, download the needed files from Github and make sure you have a text editor available, such as SublimeText or Piecharm. Copy all content to your workspace on your computer. Running the visuals locally can be done via a local host: for example via the command prompt or node.js. How to set that up can be found [here.](https://stackoverflow.com/questions/10752055/cross-origin-requests-are-only-supported-for-http-error-when-loading-a-local) 

The energy and mobility map are made in [Rstudio](https://rstudio.com/) and should be executed in that program.

### Doughnut
##### Explanation
The Festival Doughnut is a practical and context-specific translation of [Kate Raworth's theoretical framework (2017)](https://www.kateraworth.com/doughnut/) on planetary boundaries. While its main purpose is to assess DGTL's environmental performance, it also serves as a blueprint and baseline measurement tool for other festivals and events that aspire to become more circular.  

The Festival Doughnut depicts the associated environmental impacts of five festival supporting systems: water, resources, energy, mobility and food. Each part of the Doughnut represents the cumulative sum of these system's environmental impacts. The green line in the Festival Doughnut represents the boundary, which is set at zero for all environmental impacts. An impact below the zero boundary implies a positive impact; when exceeding the boundary, on the other hand, the environmental impact is understood to be negative. Since the outputs are measured in different units, the amounts are not precisely relative but have been scaled accordingly to form the Festival Doughnut. 

![Image of Doughnut](https://florindevessies.github.io/livinglab/images/Doughnut.PNG)

The bar charts display how much is emitted by the festival per environmental impact and which systems are responsible for the applicable emissions. The years are included to see the change over time. 

##### Usage
The doughnut and corresponding barchart are made using d3.js with the examples of [ricardo-marino](https://bl.ocks.org/ricardo-marino/ca2db3457f82dbb10a8753ecba8c0029) and [Brice Pierre de la Briere](https://bl.ocks.org/bricedev/8aaef92e64007f882267). To combine both visuals the radial barchart has been transformed to v4 of d3. The structure of the csv file used for this visual can be found in the doughnut folder. For the barchart seperate csv files per environmental impact are used: if replicated, the data can be copied into this accordingly. Both visualisations have the opportunity to include more (or less) environmental impacts or systems: in this case, the csv files in the folders and the metadata in the Javascript files need to be updated to the corresponding input.

![Image of Water gauge](https://florindevessies.github.io/livinglab/images/Water.PNG)
### Water
##### Explanation
The water gauge visualisation shows the decrease in water usage if DGTL would transfer to a compost toilet system. It was made to actively involve the viewer of the website in the water story. Not all information is showed upon first glance: the viewer is asked to push the button ('Show me the number!'), after which the second and third text box and gauge are visualized.
##### Usage
The water gauge is made using d3, based on the example of [Curtis Bratton](http://bl.ocks.org/brattonc/5e5ce9beee483220e2f6). No seperate data sheets are needed: changing the functions in the javascript file does the trick. These locations are identified in the javascript comments.

### Materials
##### Explanation
The materials visualisation is a Sankey diagram. The sankey shows the flow of materials to and from the festival, how much of it is reused and what is downcycled. When you hover over the visualisation the flows are animated.

##### Usage
The sankey makes use of the sankey function from d3.js and is based on the example of [Alex Holachek](https://bl.ocks.org/aholachek/5df1a95afe871be868360f312d35d057). The data for the visualisation need to be converted to a .json file: the script to do so is available in the folder. For reproduction it is therefore essential to first run this file before the visualisation is made. 

![Image of Sankey](https://florindevessies.github.io/livinglab/images/Resources.PNG)

### Mobility
##### Explanation
The travel mode of artists highly affect the CO2 and NOx emissions of the festival. The mobility map shows where artists who perform at DGTL travel from, and by which mode. For privacy reasons the artists haven't been mentioned by name.

##### Usage
This map is made using Mapbox in Rstudio. The current format requires in input folder where all the source files are stored. Please note that the working directory of has to be set to the source file location. Increasing or decreasing the number of travel routes can be done in the csv file. More information, such as the CO2 or NOx emissions per trip, can be shown on hover as well.

![Image of mobility map](https://florindevessies.github.io/livinglab/images/Mobilitymap.PNG)

### Energy
##### Explanation
The energy map shows the energy points and stages at DGTL 2019. In addition, it visualizes which stages use what amount of sustainable energy sources (green energy) and unsustainable ones (grey energy). 

##### Usage
The locations of the podia and lights were retrieved from DGTL and converted into shapefiles in arcGIS Pro. These shapefiles are stored in the input folder: for other events these shapefiles have to be changed to the locations of the chosen event. The map itself is made in Rstudio and can be adjusted to different locations. Data from other systems can be visualized with the same script.

![Image of energy map](https://florindevessies.github.io/livinglab/images/Energymap.PNG)

### Appendix
The appendix folder contains the Material Flow Analyses from 2017, 2018 and 2019, which are the data sources of many of the visuals. The aviation emission calculator sheet is included too.

### Contact
For consults or questions, please contact [Florinde Vessies](mailto:florindevessies@gmail.com).
