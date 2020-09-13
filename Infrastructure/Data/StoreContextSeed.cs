using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.IO;
using System.Text.Json;
using System.Collections.Generic;
using Core.Entities;
using System;
using Core.Entities.OrderAggregate;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.ProductBrands.Any())
                {
                    var brandsData = await
                        File.ReadAllTextAsync("../Infrastructure/Data/SeedData/brands.json");

                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                    foreach (var item in brands)
                    {
                        await context.ProductBrands.AddAsync(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.ProductTypes.Any())
                {
                    var typesData = await
                        File.ReadAllTextAsync("../Infrastructure/Data/SeedData/types.json");

                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                    foreach (var item in types)
                    {
                        await context.ProductTypes.AddAsync(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var productsData = await
                        File.ReadAllTextAsync("../Infrastructure/Data/SeedData/products.json");

                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                    foreach (var item in products)
                    {
                        await context.Products.AddAsync(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.DeliveryMethods.Any())
                {
                    var dmData = await
                        File.ReadAllTextAsync("../Infrastructure/Data/SeedData/delivery.json");

                    var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);
                    foreach (var method in methods)
                    {
                        await context.DeliveryMethods.AddAsync(method);
                    }

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}
