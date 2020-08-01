using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(conf =>
            {
                conf.SwaggerDoc("v1", new OpenApiInfo {Title = "Shop API", Version = "v1"});
            });

            return services;
        }

        // this is for Startup.cs in app.*  inject Swagger
        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(conf => {
                conf.SwaggerEndpoint("/swagger/v1/swagger.json", "Shop API v1");
            });

            return app;
        }
    }
}
