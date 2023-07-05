namespace SberAnaliticsWebApp.Models.OtherClasses
{
    public class BetweenDate
    {

        DateOnly _dateBegin;
        DateOnly _dateEnd;

        public BetweenDate()
        { 
            
        }

        public DateOnly DateBegin
        {
            get;set;
        }
        public DateOnly DateEnd
        {
            get;set;
        }

    }
}
