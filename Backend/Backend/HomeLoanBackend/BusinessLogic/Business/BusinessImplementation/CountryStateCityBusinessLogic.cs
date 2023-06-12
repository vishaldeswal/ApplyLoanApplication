using AutoMapper;
using BusinessLogic.Business.BusinessInterface;
using BusinessLogic.DTO;
using DataAccessLayer;
using DataAccessLayer.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Business.BusinessImplementation
{
    /// <summary>
    /// This Business Logic will help the Advisor to Add and set Country code, Add and Get state code, Add and Get city code.
    /// </summary>
    internal class CountryStateCityBusinessLogic: ICountryStateCityBusinessLogic<CountryDTO, StateDTO, CityDTO,EditCountryDTO,EditStateDTO,EditCityDTO>
    {
        private readonly IMapper _mapper;
        private readonly IDataAccessLayer _dataAccessLayer;
        public CountryStateCityBusinessLogic(IMapper mapper, IDataAccessLayer dataAccessLayer)
        {
            _mapper = mapper;
            _dataAccessLayer = dataAccessLayer;
        }

        //Country
        #region AddCountryCodeByAdvisor
        /// <summary>
        /// Adds a new country to the database if it doesn't already exist, based on the provided country code or name by the advisor.
        /// </summary>
        /// <param name="countryDTO"></param>
        /// <returns>True if the country was added successfully, false otherwise.</returns>
        public async Task<Guid> AddCountryCodeByAdvisor(CountryDTO countryDTO)
        {
            Country countryFromDAL = await _dataAccessLayer.Read().CountryRead().GetByConditionTask((x) => x.Code == countryDTO.Code || x.Name == countryDTO.Name);
            if(countryFromDAL != null)
            {
                throw new ArgumentException("This country already exist in DB");
            }
            Country country = _mapper.Map<Country>(countryDTO);
            country.Id = new Guid();
            bool response = await _dataAccessLayer.Write().CountryWrite().AddTask(country);
            response &= await _dataAccessLayer.Write().CommitWrite().SaveChanges();
            if (!response)
            {
                throw new ArgumentException("Country is not added");
            }
            return country.Id;
        }
        #endregion

        #region GetCountryCodeForCountryNameByAdvisor
        /// <summary>
        /// This method retrieves the country code for the given country name from the database.
        /// </summary>
        /// <param name="countryName"></param>
        /// <returns>Country Code</returns>
        public async Task<string> GetCountryCodeForCountryNameByAdvisor(string countryName)
        {
            Country countryFromDAL = await _dataAccessLayer.Read().CountryRead().GetByConditionTask((x) => x.Name == countryName);
            if(countryFromDAL == null)
            {
                throw new ArgumentException("Country does not exist");
            }
            return countryFromDAL.Code;
        }
        #endregion

        #region GetAllCountries
        /// <summary>
        /// This method retrieves all the countries from the database.
        /// </summary>
        /// <returns>All Countries List</returns>
        public async Task<IEnumerable<EditCountryDTO>> GetAllCountriesByAdvisor()
        {
            IEnumerable<Country> AllCountriesList=await _dataAccessLayer.Read().CountryRead().GetAllRecordsTask();
            if (AllCountriesList == null)
            {
                throw new ArgumentException("No Country Found");
            }
            IEnumerable<EditCountryDTO> CountriesList = _mapper.Map<IEnumerable<EditCountryDTO>>(AllCountriesList);

            return CountriesList;
        }
        #endregion


        #region EditCountryByAdvisor
        /// <summary>
        /// This method edits the country details in the database.
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Country Id</returns>
        public async Task<Guid> EditCountryByAdvisor(EditCountryDTO entity)
        {
            Country countryFromDAL = await _dataAccessLayer.Read().CountryRead().GetByConditionTask((x) => x.Id == entity.Id);
            if (countryFromDAL == null)
            {
                throw new Exception($"Country for {entity.Id} Not Found");
            }
            countryFromDAL.Name = entity.Name;
            countryFromDAL.Code = entity.Code;
            bool respone = await _dataAccessLayer.Write().CountryWrite().EditTask(countryFromDAL);
            respone &= await _dataAccessLayer.Write().CommitWrite().SaveChanges();
            if (!respone)
            {
                throw new Exception("Country is not edited");
            }
            return countryFromDAL.Id;
        }
        #endregion


        #region DeleteCountryByAdvisor
        /// <summary>
        /// This method Deletes the country details from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns true if the delete operation was successful, false otherwise.</returns>
        public async Task<bool> DeleteCountryByAdvisor(Guid id)
        {
            Country country = await _dataAccessLayer.Read().CountryRead().GetByConditionTask((x) => x.Id == id);
            if (country == null)
            {
                throw new ArgumentException("Country for the given Id was not found");
            }
            bool response = await _dataAccessLayer.Write().CountryWrite().RemoveTask(country); 
            response &= await _dataAccessLayer.Write().CommitWrite().SaveChanges();
            return response;
            
            
        }
        #endregion

        //State

        #region AddStateCodeByAdvisor 
        /// <summary>
        /// Adds a new state to the database if it doesn't already exist.
        /// The country of the state is retrieved by the country code and assigned to the state object
        /// </summary>
        /// <param name="stateDTO"></param>
        /// <returns>True if the state was added successfully, false otherwise.</returns>
        public async Task<Guid> AddStateCodeByAdvisor(StateDTO stateDTO)
        {
            State stateFromDAL = await _dataAccessLayer.Read().StateRead().GetByConditionTask((x) => x.Code == stateDTO.Code || x.Name == stateDTO.Name);
            if (stateFromDAL != null)
            {
                throw new ArgumentException("This state already exist in DB");
            }
            State state = _mapper.Map<State>(stateDTO);
            state.Id = new Guid();
            state.CountryId = (await _dataAccessLayer.Read().CountryRead().GetByConditionTask((x) => x.Code == stateDTO.CountryCode)).Id;
            bool response = await _dataAccessLayer.Write().StateWrite().AddTask(state);
            response &= await _dataAccessLayer.Write().CommitWrite().SaveChanges();
            if (!response)
            {
                throw new ArgumentException("State is not added");
            }
            return state.Id;
        }
        #endregion

        #region GetStateCodeForStateNameByAdvisor
        /// <summary>
        /// This method retrieves the state code for the given state name from the database.
        /// </summary>
        /// <param name="stateName"></param>
        /// <returns>State Code</returns>
        public async Task<string> GetStateCodeForStateNameByAdvisor(string stateName)
        {
            State stateFromDAL = await _dataAccessLayer.Read().StateRead().GetByConditionTask((x) => x.Name == stateName);
            if (stateFromDAL == null)
            {
                throw new ArgumentException("State does not exist");
            }
            return stateFromDAL.Code;
        }
        #endregion

        #region GetAllStatesOfACountryByAdvisor
        /// <summary>
        /// This method retrieves all the states of a particular country from the database.
        /// </summary>
        /// <param name="countryName"></param>
        /// <returns>States List</returns>
        public async Task<IEnumerable<EditStateDTO>> GetAllStatesOfACountryByAdvisor(string countryName)
        {
            Country countryFromDal = await _dataAccessLayer.Read().CountryRead().GetByConditionTask((x) => x.Name == countryName);
            if(countryFromDal==null)
            {
                throw new ArgumentException("Country Not Found");
            }
            IEnumerable<State> statesList = await _dataAccessLayer.Read().StateRead().GetAllRecordsByConditionTask((x) => x.CountryId == countryFromDal.Id);
            
            if (statesList == null)
            {
                throw new ArgumentException($"No states for {countryName} found ! ");
            }
            IEnumerable<EditStateDTO> AllStatesList = _mapper.Map<IEnumerable<EditStateDTO>>(statesList);
            foreach (EditStateDTO state in AllStatesList)
            {
                state.CountryCode = countryFromDal.Code;
            }
            return AllStatesList;
        }
        #endregion

        #region EditStateByAdvisor
        /// <summary>
        /// This method edits the country details in the database.
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>State Id</returns>
        public async Task<Guid> EditStateByAdvisor(EditStateDTO entity)
        {
            State stateFromDAL = await _dataAccessLayer.Read().StateRead().GetByConditionTask((x) => x.Id == entity.Id);
            if (stateFromDAL == null)
            {
                throw new Exception($"State for {entity.Id} Not Found");
            }
            Country country = await (_dataAccessLayer.Read().CountryRead().GetByConditionTask((x) => x.Code == entity.CountryCode));
            if(country==null)
            {
                throw new ArgumentException("Country Code is Incorrect ! No such Country Found");
            }
            stateFromDAL.Name = entity.Name;
            stateFromDAL.Code = entity.Code;
            stateFromDAL.CountryId = country.Id;
            bool respone = await _dataAccessLayer.Write().StateWrite().EditTask(stateFromDAL);
            respone &= await _dataAccessLayer.Write().CommitWrite().SaveChanges();
            if (!respone)
            {
                throw new Exception("State is not edited");
            }
            return stateFromDAL.Id;
        }
        #endregion

        #region DeleteStateByAdvisor
        /// <summary>
        /// This method Deletes the State details from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns true if the delete operation was successful, false otherwise.</returns>
        public async Task<bool> DeleteStateByAdvisor(Guid id)
        {
            State state = await _dataAccessLayer.Read().StateRead().GetByConditionTask((x) => x.Id == id);
            if (state == null)
            {
                throw new ArgumentException("State for the given Id was not found");
            }
            
            bool response = await _dataAccessLayer.Write().StateWrite().RemoveTask(state);
            response &= await _dataAccessLayer.Write().CommitWrite().SaveChanges();
            return response;


        }
        #endregion

        //City
        #region AddCityCodeByAdvisor
        /// <summary>
        /// Adds a new city to the database if it does not already exist.
        /// </summary>
        /// <param name="cityDTO"></param>
        /// <returns>True if the city was added successfully, false otherwise.</returns>
        public async Task<Guid> AddCityCodeByAdvisor(CityDTO cityDTO)
        {
            City cityFromDAL = await _dataAccessLayer.Read().CityRead().GetByConditionTask((x) => x.Code == cityDTO.Code || x.Name == cityDTO.Name);
            if (cityFromDAL != null)
            {
                throw new ArgumentException("This city already exist in DB");
            }
            City city = _mapper.Map<City>(cityDTO);
            city.Id = new Guid();
            city.StateId = (await _dataAccessLayer.Read().StateRead().GetByConditionTask((x) => x.Code == cityDTO.StateCode)).Id;
            bool response = await _dataAccessLayer.Write().CityWrite().AddTask(city);
            response &= await _dataAccessLayer.Write().CommitWrite().SaveChanges();
            if (!response)
            {
                throw new ArgumentException("State is not added");
            }
            return city.Id;
        }
        #endregion

        #region GetCityCodeForCityNameByAdvisor
        /// <summary>
        /// This method retrieves the city code for the given city name from the database.
        /// </summary>
        /// <param name="cityName"></param>
        /// <returns>city code</returns>
        public async Task<string> GetCityCodeForCityNameByAdvisor(string cityName)
        {
            City cityFromDAL = await _dataAccessLayer.Read().CityRead().GetByConditionTask((x) => x.Name == cityName);
            if (cityFromDAL == null)
            {
                throw new ArgumentException("City does not exist");
            }
            return cityFromDAL.Code;
        }
        #endregion

        #region GetAllCitiesOfAStateByAdvisor
        /// <summary>
        /// This method retrieves all the cities for the given state from the database.
        /// </summary>
        /// <param name="countryName"></param>
        /// <param name="stateName"></param>
        /// <returns>All Cities List</returns>
        public async Task<IEnumerable<EditCityDTO>> GetAllCitiesOfAStateByAdvisor(string countryName, string stateName)
        {
            Country country = await _dataAccessLayer.Read().CountryRead().GetByConditionTask((x) => x.Name == countryName);
            if(country==null)
            {
                throw new ArgumentException("Country Not Found");
            }
            State state = await _dataAccessLayer.Read().StateRead().GetByConditionTask((x) => x.CountryId == country.Id && x.Name == stateName);
            if (state == null)
            {
                throw new ArgumentException("State Not Found");
            }
            IEnumerable<City> AllCitiesList = await _dataAccessLayer.Read().CityRead().GetAllRecordsByConditionTask((x) => x.StateId == state.Id);
            if (AllCitiesList == null)
            {
                throw new ArgumentException($" Cities for {stateName},{countryName} couldn't be found");
            }
            IEnumerable<EditCityDTO> CityList = _mapper.Map<IEnumerable<EditCityDTO>>(AllCitiesList);
            foreach(EditCityDTO city in CityList)
            {
                city.StateCode = state.Code;
            }
            return CityList;
        }
        #endregion

        #region EditCityByAdvisor
        /// <summary>
        /// This method edits the country details in the database.
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>State Id</returns>
        public async Task<Guid> EditCityByAdvisor(EditCityDTO entity)
        {
            City cityFromDAL = await _dataAccessLayer.Read().CityRead().GetByConditionTask((x) => x.Id == entity.Id);
            if (cityFromDAL == null)
            {
                throw new Exception($"City for {entity.Id} Not Found");
            }
            State state = await _dataAccessLayer.Read().StateRead().GetByConditionTask((x) => x.Code == entity.StateCode);
            if(state==null)
            {
                throw new ArgumentException("No such State Found");
            }
            cityFromDAL.Name = entity.Name;
            cityFromDAL.Code = entity.Code;
            cityFromDAL.StateId = state.Id;
            bool respone = await _dataAccessLayer.Write().CityWrite().EditTask(cityFromDAL);
            respone &= await _dataAccessLayer.Write().CommitWrite().SaveChanges();
            if (!respone)
            {
                throw new Exception("City is not edited");
            }
            return cityFromDAL.Id;
        }
        #endregion

        #region DeleteCityByAdvisor
        /// <summary>
        /// This method Deletes the City details from the database.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns true if the delete operation was successful, false otherwise.</returns>
        public async Task<bool> DeleteCityByAdvisor(Guid id)
        {
            City city = await _dataAccessLayer.Read().CityRead().GetByConditionTask((x) => x.Id == id);
            if (city == null)
            {
                throw new ArgumentException("City for the given Id was not found");
            }

            bool response = await _dataAccessLayer.Write().CityWrite().RemoveTask(city);
            response &= await _dataAccessLayer.Write().CommitWrite().SaveChanges();
            return response;


        }
        #endregion
    }
}
