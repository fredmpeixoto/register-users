using ManagerUsers.Api.Commons;
using ManagerUsers.Domain.Interfaces;
using ManagerUsers.Domain.Interfaces.Repository;
using ManagerUsers.Domain.Services;
using ManagerUsers.Infra.Data;
using ManagerUsers.Infra.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;

namespace ManagerUsers.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private readonly string myCorsPolicy = "_myCorsPolicy";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<UserContext>(options =>
              options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));


            // Add application services.
            services.AddControllers();


            // Add service and create Policy with options CORES
            services.AddCors(options =>
            {
                options.AddPolicy(myCorsPolicy,
                    builder =>
                    builder.AllowAnyMethod()
                           .AllowAnyHeader()
                           .SetIsOriginAllowed(_ => true)
                           .AllowCredentials()
                    ); ;
            });


            #region AUTH
            // services.AddTransient<UsersDAO>();

            var signingConfigurations = new SigningConfigurations();
            services.AddSingleton(signingConfigurations);

            var tokenConfigurations = new TokenConfigurations();
            new ConfigureFromConfigurationOptions<TokenConfigurations>(
                Configuration.GetSection("TokenConfigurations"))
                    .Configure(tokenConfigurations);
            services.AddSingleton(tokenConfigurations);

            services.AddAuthentication(authOptions =>
            {
                authOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                authOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(bearerOptions =>
            {
                var paramsValidation = bearerOptions.TokenValidationParameters;
                paramsValidation.IssuerSigningKey = signingConfigurations.Key;
                paramsValidation.ValidAudience = tokenConfigurations.Audience;
                paramsValidation.ValidIssuer = tokenConfigurations.Issuer;

                // Valida a assinatura de um token recebido
                paramsValidation.ValidateIssuerSigningKey = true;

                // Verifica se um token recebido ainda é válido
                paramsValidation.ValidateLifetime = true;

                // Tempo de tolerância para a expiração de um token (utilizado
                // caso haja problemas de sincronismo de horário entre diferentes
                // computadores envolvidos no processo de comunicação)
                paramsValidation.ClockSkew = TimeSpan.Zero;
            });

            // Ativa o uso do token como forma de autorizar o acesso
            // a recursos deste projeto
            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser().Build());
            });

            #endregion


            #region services
            services.AddTransient<IUserService, UserService>();
            #endregion

            #region repository
            services.AddTransient<IUserRepository, UserRepository>();
            #endregion


            services.AddMvc();


            //Add Swagger
            services.AddSwaggerGen(config =>
            {
                config.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Manager User API",
                    Description = "Management user api to create, read, update and delete users",
                    Contact = new OpenApiContact
                    {
                        Name = "Fred Peixoto",
                        Email = "fredmpeixoto@gmail.com",
                        Url = new Uri("https://github.com/fredmpeixoto"),
                    },
                });

                config.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                config.AddSecurityRequirement(new OpenApiSecurityRequirement()
                 {
                   {
                     new OpenApiSecurityScheme
                     {
                       Reference = new OpenApiReference
                         {
                           Type = ReferenceType.SecurityScheme,
                           Id = "Bearer"
                         },
                         Scheme = "oauth2",
                         Name = "Bearer",
                         In = ParameterLocation.Header,

                       },
                       new List<string>()
                     }
                });


            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {


            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API");
                c.RoutePrefix = string.Empty;
            });

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();
            /*core policy*/
            app.UseCors(myCorsPolicy);

            app.UseEndpoints(endpoint =>
                {
                    endpoint.MapControllers();
                });


            app.UseDeveloperExceptionPage();



        }
    }
}
