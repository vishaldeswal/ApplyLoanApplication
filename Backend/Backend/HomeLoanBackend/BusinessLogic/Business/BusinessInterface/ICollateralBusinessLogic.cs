using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Business.BusinessInterface
{
    /// <summary>
    /// This interface defines the business logic methods for managing collateral entities related to user accounts.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <typeparam name="P"></typeparam>
    public interface ICollateralBusinessLogic<T, P, X>
    {
        public Task<Guid> AddCollateralByUserTask(string emailId, T entity);
        public Task<bool> DeleteCollateralByUserTask(string emailId, Guid id);
        public Task<IEnumerable<X>> GetAllCollateralByUserEmailTask(string emailId);
        public Task<Guid> EditCollateralByUserTask(string emailId,P entity);
        public Task<bool> SetCollateralToAnApplicationByUserTask(string emailId, Guid collateralId, Guid ApplicationId);

    }
}
