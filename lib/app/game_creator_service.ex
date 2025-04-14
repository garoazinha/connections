defmodule App.GameCreatorService do
  alias App.Repo
  alias App.Game

  def execute(groups) do
    extra = groups["extra"]
    processed_groups = process_groups(groups["groups"])

    if Enum.empty?(processed_groups) do
      data = %{errors: "Put some group in that"}
      {:error, data}
    else
      Game.changeset(%Game{}, %{groups: processed_groups, extra: extra})
        |> Repo.insert()
    end
  end

  defp add_group(group) do
    %{
      level: group["level"],
      title: group["title"],
      members: Enum.join(Map.fetch!(group,"members"), ";")
    }
  end

  defp process_groups(groups) do
    Enum.map(groups, fn group -> add_group(group) end)
  end
end
