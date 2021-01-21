pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Healthblock {
  address public owner;
  uint public number=0;
  uint public report_count=0;
  uint public provider_report=0;
  mapping (address => doctor)  public doctors;
  mapping (address => patient) public patients;
  mapping (address =>provider) public providers;
  mapping (string => report) public reports; 
  mapping (string => covid_report) public covid_reports;
  mapping (uint => covid_report) public covid_report_list;
  mapping (uint=>report) public reportlist;
  mapping (address =>report) public doctoReport;
  
  string public name = "Healthblock";
  struct report {
      uint id;
      string name;  
      string report_hash;
      address owner;
      address[] doctors_assigned;
    }
    struct covid_report{
      uint id;
      string name;
      string report_hash;
      address owner;
    }
  struct patient {
      string name;
      address id; 
      string[] reports;
  }
  struct provider{
    string name;
    address id;
    string[] reports;
  }
  struct doctor {
      string name;
      address id;
      string[] reports_hash;
  }
  constructor() public {
    owner = msg.sender;
  }
  function register(string memory _name, uint8 member) public returns(string memory,string memory){
    if (member==0){
        patient memory p = patients[msg.sender];
        require(!(p.id > address(0x0)));
        patients[msg.sender] = patient({name:_name,id:msg.sender,reports:new string[](100)});   
        return (_name,"patient");
        }
    else if (member==1){
      doctors[msg.sender] = doctor({name:_name,id:msg.sender,reports_hash:new string[](100)});
      return (_name,"doctor");
      }
    else if (member==2){
      providers[msg.sender]=provider({name:_name,id:msg.sender,reports:new string[](0)});
      return (_name,"provider");
    }
    }   
  function getProfile(address _user) public view  returns(string memory, string memory){
      patient memory p = patients[_user];
      doctor memory d = doctors[_user];
      provider memory pro =providers[_user];
      if(p.id > address(0x0))
          return (p.name, 'patient');
      else if(d.id > address(0x0))
          return (d.name, 'doctor');
      else if (pro.id> address(0x0))
          return (pro.name,'provider');
      else
          return (' ', '');
  }
  function uploadCovidReport(string memory _name,string memory _reporthash)public{
    covid_reports[_reporthash]=covid_report({id:provider_report,name:_name,report_hash:_reporthash,owner:msg.sender});
    providers[msg.sender].reports.push(_reporthash);
    covid_report_list[provider_report]=covid_reports[_reporthash];
    provider_report++;

  }
  function uploadReport(string memory _name,string memory _reporthash) public {
    reports[_reporthash ]=report({id:report_count,name:_name,report_hash:_reporthash,owner:msg.sender,doctors_assigned:new address[](0)});
    patients[msg.sender].reports.push(_reporthash);
    reportlist[report_count]=reports[_reporthash];
    report_count++;
  }
  function getReports() external  returns (string[] memory){
    return patients[msg.sender].reports;
  }
  function grantAccess(uint _id,address  _docAddress) public returns(uint){
    doctor memory d = doctors[_docAddress];
    
    if (d.id > address(0x0)){
      reportlist[_id].doctors_assigned.push(_docAddress);
      doctors[_docAddress].reports_hash.push(reportlist[_id].report_hash);
      //d.reports_hash.push(reportlist[_id]);
      return(1);
    }
    else{
      return(0);
    }
  }
  function getReportDoctor() external returns(string[] memory){
    return doctors[msg.sender].reports_hash;
  }
  /*function getReportDoctor() external returns(string[] memory,address[] memory){
    string[] memory hashes;
    address[]  memory patient_address;
    for (uint i=0;i<report_count;i++){
      report memory rep = reportlist[i];
      string[] memory doctorsAssigned =rep.doctors_assigned;
      for (uint j=0;j<doctorsAssigned.length;j++){
        if (doctorsAssigned[j]==msg.sender){
          hashes.push(rep.report_hash);
          patient_address.push(rep.owner);
          break;
        }
      }
    }
    return (hashes,patient_address);
  } */
}