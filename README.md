# DGTL Doughnut visualisations
This github repository contains the scripts and datafiles used for the interactive visualisations of the DGTLdoughnut website (add link), which will give you insights into DGTL festival’s systems and their related footprint, and will provide you with a deeper understanding on how festivals can and are taking measures to become more sustainable and climate neutral places.

We strongly believe that it's essential to share knowledge on and enhance the replicability of this important topic, which is why we elaborated on the specifics of our methodology here (add link PDF). This github repository contains the visuals that connect this method, the content of this repository is open source. It contains five folders that are directly used at the webstie: the Doughnut, Energy, Materials, Mobility and Water, and one folder with older versions of visualisation. Below a more in depth explanation of each visual is given.

##### Overall usage guide
To start working with these visuals, blablabla Github dowload. Copy all content to your workspace on your computer. Running the visuals locally can be done via a local host: for example via the command prompt or node.js. How to set that up can be found [here.](https://stackoverflow.com/questions/10752055/cross-origin-requests-are-only-supported-for-http-error-when-loading-a-local) 

### Doughnut
##### Explanation
The Festival Doughnut is a practical and context-specific translation of [Kate Raworth's theoretical framework (2017)](https://www.kateraworth.com/doughnut/) on planetary boundaries. While its main purpose is to assess DGTL's environmental performance, it also serves as a blueprint and baseline measurement tool for other festivals and events that aspire to become more circular.  

The Festival Doughnut depicts the associated environmental impacts of five festival supporting systems: water, resources, energy, mobility and food. Each part of the Doughnut represents the cumulative sum of these system's environmental impacts. The green line in the Festival Doughnut represents the boundary, which is set at zero for all environmental impacts. An impact below the zero boundary implies a positive impact; when exceeding the boundary, on the other hand, the environmental impact is understood to be negative. The 2019 DGTL Doughnut shows that the zero boundary is crossed for all environmental impacts meaning they are all overshooting. Since the outputs are measured in different units, the amounts are not precisely relative but have been scaled accordingly to form the Festival Doughnut. 
![Image of Doughnut](https://florindevessies.github.io/livinglab/images/Doughnut.PNG)

The bar charts display how much is emitted by the festival per environmental impact and which systems are responsible for the applicable emissions. The years are included to see the change over time. 

##### Usage
The doughnut and corresponding barchart are made using d3.js with the examples of .. and ... To combine both visuals the radial barchart has been transformed to v4 of d3. The structure of the csv file used for this visual can be found in the doughnut folder. For the barchart seperate csv files per environmental impact are used: if replicated, the data can be copied into this accordingly. 


### Water
![Image of Water gauge](https://florindevessies.github.io/livinglab/images/Water.PNG)
### Resources
![Image of Sankey](https://florindevessies.github.io/livinglab/images/Resources.PNG)
### Mobility
![Image of mobility map](https://florindevessies.github.io/livinglab/images/Mobilitymap.PNG)
### Energy
![Image of energy map](https://florindevessies.github.io/livinglab/images/Energymap.PNG)

Description: A description of your project follows. A good description is clear, short, and to the point. Describe the importance of your project, and what it does.

Table of Contents: Optionally, include a table of contents in order to allow other people to quickly navigate especially long or detailed READMEs.

Installation: Installation is the next section in an effective README. Tell other users how to install your project locally. Optionally, include a gif to make the process even more clear for other people.

Usage: The next section is usage, in which you instruct other people on how to use your project after they’ve installed it. This would also be a good place to include screenshots of your project in action.

