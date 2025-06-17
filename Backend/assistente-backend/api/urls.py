from django.urls import path
# Importe todas as suas views do arquivo views.py do mesmo app.
from .views import (
    gerar_planejamento,
    ValidarUsuarioView,
    CriarUsuarioView,
    SincronizarProvasTrabalhosView,
    BuscarRotinaView 
)

urlpatterns = [
    # O prefixo 'api/' já foi definido no arquivo principal, então aqui começamos direto no endpoint.
    
    # URL final: /api/gerar-planejamento/
    path('gerar-planejamento/', gerar_planejamento, name='gerar_planejamento'),
    
    # URL final: /api/validarUsuario/
    path('validarUsuario/', ValidarUsuarioView.as_view(), name='validar_usuario'),
    
    # URL final: /api/criarUsuario/
    path('criarUsuario/', CriarUsuarioView.as_view(), name='criar_usuario'),
    
    # URL final: /api/sincronizar-provas-trabalhos/
    path('sincronizar-provas-trabalhos/', SincronizarProvasTrabalhosView.as_view(), name='sincronizar_provas_trabalhos'),

    # URL final: /api/buscar-rotina/
    path('buscar-rotina/', BuscarRotinaView.as_view(), name='buscar_rotina'),
]
