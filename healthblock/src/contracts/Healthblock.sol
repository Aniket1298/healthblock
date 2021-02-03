pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Healthblock {
  address public owner;
  uint public number=0;
  uint public report_count=0;
  uint public provider_report=0;
  uint public presCount=0;
  mapping (address => doctor)  public doctors;
  mapping (address => patient) public patients;
  mapping (address =>provider) public providers;
  mapping (string => prescription) public presmap;
  mapping (string => report) public reports; 
  mapping (string => covid_report) public covid_reports;
  mapping (uint => covid_report) public covid_report_list;
  mapping (uint=>report) public reportlist;
  mapping (address =>report) public doctoReport;
  mapping (uint=>prescription) public presList;
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
      string [] pres_hashes;
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
      string [] prescriptions;
  }
  struct prescription{
    string pres_hash;
    address owner;
    address patient_to; 
  }
  constructor() public {
    owner = msg.sender;
  }
  report[] public Reports;  
  function register(string memory _name, uint8 member) public returns(string memory,string memory){
    if (member==0){
        patient memory p = patients[msg.sender];
        require(!(p.id > address(0x0)));
        patient memory pat;
        pat.name=_name;
        pat.id=msg.sender;
        patients[msg.sender] = pat;  
        return (_name,"patient");
        }
    else if (member==1){
      doctor memory doc;
      doc.name=_name;
      doc.id=msg.sender;
      doctors[msg.sender] = doc;
      return (_name,"doctor");
      }
    else if (member==2){
      provider memory pro;
      pro.name=_name;
      pro.id=msg.sender;
      providers[msg.sender]=pro;
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
    report memory rep;
    rep.id=report_count;
    rep.name=_name;
    rep.owner=msg.sender;
    rep.report_hash=_reporthash;
    reports[_reporthash ]=rep;
    Reports.push(rep);
    patients[msg.sender].reports.push(_reporthash);
    reportlist[report_count]=reports[_reporthash];
    report_count++;
  }
  function getReps() public view returns (report[] memory){
    return(Reports);
  }
  function getPatData(address _user) public view returns(patient memory){
    return(patients[_user]);
  }
  function getDocData(address _user) public view returns(doctor memory){
    return(doctors[_user]);
  }
  function getReports()  public view   returns (string[] memory){
    return patients[msg.sender].reports;
  }
  function grantAccess(string memory _hash,address  _docAddress) public returns(uint){
    doctor memory d = doctors[_docAddress];
    report memory rep= reports[_hash];
    if (d.id > address(0x0)){
      reports[_hash].doctors_assigned.push(_docAddress);
      doctors[_docAddress].reports_hash.push(_hash);
      return(1);
    }
    else{
      return(0);
    }
  }
  function getReportDoctor(address _user) public view returns(string[] memory){
    return doctors[_user].reports_hash;
  }
  function uploadPres(string memory _hash,address _patient_address,address _user) public{
    prescription memory pres;
    pres.owner=_user;
    pres.patient_to=_patient_address;
    pres.pres_hash=_hash;
    presmap[_hash]=pres;
    doctors[_user].prescriptions.push(_hash);
    patients[_patient_address].pres_hashes.push(_hash);
  }
  function getpres(address _user)public view returns (string[] memory){
    return (patients[_user].pres_hashes);
  }
  function getAllPres(address _user) public view returns(string[] memory){
    return(doctors[_user].prescriptions);
  }
}