Meteor.methods({
    getNumber(companyId,docNumber){
      //document is the field in counters
      let number = Companies.findOne({_id:companyId}).counters[docNumber];
      number++;
      const str = "counters." + docNumber ;
      Companies.update({_id:companyId},
        {$set:
          {
            [str]:number
          }
        }
      );
      
      let numStr = String(number);
      let i = numStr.length;
      do {
        numStr = '0' + numStr;
        i++;
      }while(i<8);
        return  numStr;
    },
    getNumber(companyId,docNumber){
      //document is the field in counters
      let number = Companies.findOne({_id:companyId}).counters[docNumber];
      number++;
      const str = "counters." + docNumber ;
      Companies.update({_id:companyId},
        {$set:
          {
            [str]:number
          }
        }
      );
      
      let numStr = String(number);
      let i = numStr.length;
      do {
        numStr = '0' + numStr;
        i++;
      }while(i<8);
        return  numStr;
    },
    getNumberWithPrefix(companyId,docNumber,docPrefix){
      //document is the field in counters
      let number = Companies.findOne({_id:companyId}).counters[docNumber];
      let prefix = Companies.findOne({_id:companyId}).counters[docPrefix];
      number++;
      const str = "counters." + docNumber ;
      Companies.update({_id:companyId},{$set:
        { 
          [str]:number
        }
    });
    let numStr = String(number);
    let i = numStr.length;
    do {
      numStr = '0' + numStr;
      i++;
    }while(i<8);
      return prefix + '-' + numStr;
    }

 });
