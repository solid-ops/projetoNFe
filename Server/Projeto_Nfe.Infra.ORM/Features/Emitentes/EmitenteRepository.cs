﻿using Projeto_Nfe.Infra.ORM.Context;
using Projeto_NFe.Domain.Base.Exceptions;
using Projeto_NFe.Domain.Features.Emitentes;
using System.Data.Entity;
using System.Linq;

namespace Projeto_Nfe.Infra.ORM.Features.Emitentes
{
    public class EmitenteRepository : IEmitenteRepository
    {
        ProjetoNFeContext _context;
        public EmitenteRepository(ProjetoNFeContext context)
        {
            _context = context;
        }

        public Emitente Add(Emitente emitente)
        {
            var novoEmitente = _context.Emitentes.Add(emitente);
            _context.SaveChanges();
            return novoEmitente;
        }

        public bool Update(Emitente emitente)
        {
            _context.Entry(emitente).State = EntityState.Modified;
            return _context.SaveChanges() > 0;
        }

        public bool Remove(long emitenteId)
        {
            var emitente = _context.Emitentes.FirstOrDefault(p => p.Id == emitenteId);
            if (emitente == null)
                throw new NotFoundException();
            _context.Entry(emitente).State = EntityState.Deleted;
            return _context.SaveChanges() > 0;
        }

        public IQueryable<Emitente> GetAll()
        {
            return _context.Emitentes;
        }

        public Emitente GetById(long emitenteId)
        {
            return _context.Emitentes.FirstOrDefault(c => c.Id == emitenteId);
        }
    }
}
