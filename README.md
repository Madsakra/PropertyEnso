For boundary files -> Go to src -> Components
For Controller files -> Go to src -> Controller
For Entity files -> Go to src -> Entity

For controller class Methods:


***** IF THE PUSH WORD IS INFRONT OF THE METHOD, IT SIMPLY MEANS TO PUSH THE PROCESS. EG:

AgentRatingsController, AgentReviewsController class: 

pushFetchProcess(uid,currentProfileID) -> means fetch agent ratings

ClientNewPropertiesController, ClientNewPropertiesController, ViewProfilesController, ViewAccountsController class:  

pushFetch() -> simply means push the fetch process

RemoveListingController class: 

pushForRemove(email,password,currentProperty) -> simply means push the remove process


*********************************************************************************
