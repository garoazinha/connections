defmodule AppWeb.GameController do
  # alias AppWeb.Game.Game
  use AppWeb, :controller
  import AppWeb.Game
  alias App.Game
  alias App.Repo
  import Ecto.Query

  def daily(conn, _params) do
    game = Repo.one(from g in Game, preload: [:groups])

    render(conn, game: game)
  end
end
