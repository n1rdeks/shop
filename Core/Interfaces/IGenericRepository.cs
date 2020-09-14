using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;


namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
        Task<int> CountAsync(ISpecification<T> spec);

        // no need async, because this methods not work with DB, only for UnitOfWork tracking
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
