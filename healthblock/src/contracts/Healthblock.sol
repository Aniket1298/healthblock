pragma solidity ^0.5.16;

contract Healthblock {
  address public owner;
  uint public number=0;
  mapping (address => doctor) private doctors;// doctor and list of patient profile he can access
  mapping (address => patient) private patients;
  mapping (bytes32 => report) private hashToFile; //filehash to file info
  string public name = "Healthblock";
  struct report {
      string report_name;
      string report_type;
      string report_hash;
      address owner;
    }
  
  struct patient {
      string name;
      address id;
      bytes32[] reports;
  }
  struct doctor {
      string name;
      address id;
  }
  constructor() public {
    owner = msg.sender;
  }
  function add() public returns(uint){
      number ++;
      return(number);
  }
  function hello(string memory _test) public returns(string memory){
      return (_test);   
  }
  function register(string memory _name, uint8 member) public returns(string memory,string memory){
    if (member==0){
        patient memory p = patients[msg.sender];
        require(!(p.id > address(0x0)));
        patients[msg.sender] = patient({name:_name,id:msg.sender,reports:new bytes32[](0)});   
        return (_name,"patient");
        }
    else if (member==1){
      doctors[msg.sender] = doctor({name:_name,id:msg.sender});
      return (_name,"doctor");
        }
    }
  function getProfile(address _user) public  returns(string memory, string memory){
      patient memory p = patients[_user];
      doctor memory d = doctors[_user];
      if(p.id > address(0x0))
          return (p.name, 'patient');
      else if(d.id > address(0x0))
          return (d.name, 'doctor');
      else
          return (' ', '');
  }  
}